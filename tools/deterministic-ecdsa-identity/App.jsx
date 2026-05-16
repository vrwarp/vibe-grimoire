import { useState } from 'react';

// --- Crypto Utilities ---

// Helper: Web Crypto JWK requires Base64URL encoding
function bufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  const binString = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binString)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Helper: Standard Base64 for display
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  const binString = Array.from(bytes).map(b => String.fromCharCode(b)).join('');
  return btoa(binString);
}

// The core function we discussed
async function generateIdentityKeyPairFromSeed(
  seed,
  saltString = "demo-application-salt"
) {
  // Use esm.sh with the ?bundle parameter to inline dependencies like @noble/hashes.
  // This prevents the "Cannot read properties of null (reading 'sha256')" error.
  const nobleCurves = await new Function(`return import('https://esm.sh/@noble/curves@1.4.0/p256?bundle')`)();
  const { p256 } = nobleCurves;

  const encoder = new TextEncoder();
  const seedBuffer = encoder.encode(seed);
  const saltBuffer = encoder.encode(saltString);

  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    seedBuffer,
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: 600000,
      hash: "SHA-256",
    },
    baseKey,
    256 // 32 bytes
  );

  const privateKeyBytes = new Uint8Array(derivedBits);

  const publicKeyBytes = p256.getPublicKey(privateKeyBytes, false);
  const x = publicKeyBytes.slice(1, 33);
  const y = publicKeyBytes.slice(33, 65);

  const jwkPublic = {
    kty: "EC",
    crv: "P-256",
    x: bufferToBase64Url(x),
    y: bufferToBase64Url(y),
    ext: true,
  };

  const jwkPrivate = {
    ...jwkPublic,
    d: bufferToBase64Url(privateKeyBytes),
  };

  const algorithm = { name: "ECDSA", namedCurve: "P-256" };

  const [publicKey, privateKey] = await Promise.all([
    window.crypto.subtle.importKey("jwk", jwkPublic, algorithm, true, ["verify"]),
    window.crypto.subtle.importKey("jwk", jwkPrivate, algorithm, true, ["sign"]),
  ]);

  return { publicKey, privateKey };
}

// --- Main Application Component ---

export default function App() {
  const [seed, setSeed] = useState("my-secret-passphrase");
  const [salt, setSalt] = useState("user@example.com");
  const [isGenerating, setIsGenerating] = useState(false);

  // Key state
  const [keys, setKeys] = useState(null);
  const [publicKeyJwk, setPublicKeyJwk] = useState(null);

  // App Usage State
  const [messageToSign, setMessageToSign] = useState("I authorize a transfer of 50 credits.");
  const [signature, setSignature] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    setKeys(null);
    setPublicKeyJwk(null);
    setSignature(null);
    setVerificationResult(null);

    try {
      // Small timeout to allow UI to update to "generating" state before blocking JS thread
      setTimeout(async () => {
        const generatedKeys = await generateIdentityKeyPairFromSeed(seed, salt);
        setKeys(generatedKeys);

        // Export public key to show to the user
        const exportedPublic = await window.crypto.subtle.exportKey("jwk", generatedKeys.publicKey);
        setPublicKeyJwk(exportedPublic);
        setIsGenerating(false);
      }, 50);
    } catch (error) {
      console.error("Error generating keys:", error);
      setIsGenerating(false);
    }
  };

  const handleSign = async () => {
    if (!keys) return;
    setIsSigning(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(messageToSign);

      const sigBuffer = await window.crypto.subtle.sign(
        { name: "ECDSA", hash: { name: "SHA-256" } },
        keys.privateKey,
        data
      );

      setSignature(bufferToBase64(sigBuffer));
      setVerificationResult(null); // Reset verification on new signature
    } catch (e) {
      console.error("Signing failed", e);
    } finally {
      setIsSigning(false);
    }
  };

  const handleVerify = async () => {
    if (!keys || !signature) return;
    setIsVerifying(true);
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(messageToSign);

      // Convert base64 signature back to buffer
      const binaryString = atob(signature);
      const sigBytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        sigBytes[i] = binaryString.charCodeAt(i);
      }

      const isValid = await window.crypto.subtle.verify(
        { name: "ECDSA", hash: { name: "SHA-256" } },
        keys.publicKey,
        sigBytes.buffer,
        data
      );

      setVerificationResult(isValid);
    } catch (e) {
      console.error("Verification failed", e);
      setVerificationResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="mb-4">
          <a href="../../" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              <i className="fa-solid fa-arrow-left mr-2"></i> Back to Tools
          </a>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Deterministic ECDSA Identity Tool</h1>
          <p className="text-slate-600">Demonstrates generating a P-256 key pair from a seed string using PBKDF2 and @noble/curves.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left Column: Generation */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Generate Identity</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Seed Phrase (Password)</label>
                <input
                  type="text"
                  value={seed}
                  onChange={e => setSeed(e.target.value)}
                  className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Salt (e.g. Email/Username)</label>
                <input
                  type="text"
                  value={salt}
                  onChange={e => setSalt(e.target.value)}
                  className="w-full p-2 border rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                onClick={handleGenerateKeys}
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {isGenerating ? "Computing PBKDF2 (Please wait)..." : "Generate Keys Deterministically"}
              </button>

              {publicKeyJwk && (
                <div className="mt-4 p-4 bg-slate-100 rounded text-sm overflow-x-auto">
                  <p className="font-semibold text-green-700 mb-2">✓ Keys Generated Successfully</p>
                  <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Public Key (JWK format):</p>
                  <pre className="text-xs text-slate-700">
                    {JSON.stringify(publicKeyJwk, null, 2)}
                  </pre>
                  <p className="text-xs text-slate-500 mt-2 italic">The private key is securely held in browser memory as a CryptoKey object.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Usage */}
          <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-opacity ${!keys ? 'opacity-50 pointer-events-none' : ''}`}>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Use Identity (Sign & Verify)</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Message to Sign</label>
                <textarea
                  value={messageToSign}
                  onChange={e => {
                    setMessageToSign(e.target.value);
                    setVerificationResult(null); // Reset if message changes
                  }}
                  rows={3}
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSign}
                disabled={isSigning || !keys}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {isSigning ? "Signing..." : "Sign Message with Private Key"}
              </button>

              {signature && (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-slate-500 mb-1 text-xs uppercase tracking-wider">Signature (Base64):</p>
                    <div className="p-2 bg-slate-100 rounded font-mono text-xs break-all text-slate-700 border border-slate-200">
                      {signature}
                    </div>
                  </div>

                  <button
                    onClick={handleVerify}
                    disabled={isVerifying || !keys || !signature}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
                  >
                    {isVerifying ? "Verifying..." : "Verify Signature with Public Key"}
                  </button>

                  {verificationResult !== null && (
                    <div className={`p-3 rounded font-medium text-center ${verificationResult ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                      {verificationResult ? '✓ Signature is Valid' : '✗ Signature is Invalid'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="mt-8 text-sm text-slate-500 text-center max-w-2xl mx-auto">
          <p>This demonstration uses 600,000 iterations of PBKDF2 to derive 32 bytes of secure entropy from the seed, which is then used as the scalar for the P-256 elliptic curve via the <code>@noble/curves</code> library.</p>
        </div>
      </div>
    </div>
  );
}
