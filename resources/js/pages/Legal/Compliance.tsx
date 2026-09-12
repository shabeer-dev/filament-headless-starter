import LegalPageLayout from './LegalPageLayout';

export default function Compliance() {
    return (
        <LegalPageLayout title="Compliance & Security Standards" lastUpdated="June 2, 2026">
            <h2 className="text-xl font-bold text-primary mt-8 mb-4">1. Commitment to Security & Quality</h2>
            <p>
                We are committed to maintaining the highest standards of security, privacy, and architectural resilience
                across our platform. Our compliance framework is built upon internationally recognized security and data protection standards.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">2. Security & Compliance Certifications</h2>
            <p>
                Our infrastructure and application lifecycle adhere to rigorous industry benchmarks:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>ISO/IEC 27001</strong> — Information Security Management Systems ensuring systematic protection of confidential client data.</li>
                <li><strong>SOC 2 Type II</strong> — Comprehensive validation of security, availability, confidentiality, and processing integrity.</li>
                <li><strong>GDPR & CCPA Compliant</strong> — Full transparency, data portability, and adherence to global consumer privacy rights.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">3. Data Protection & Encryption</h2>
            <p>
                All data in transit is encrypted using modern TLS 1.3 cryptographic protocols. Data at rest is secured with AES-256 encryption.
                Regular vulnerability assessments and penetration tests are conducted to ensure enterprise readiness.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">4. SLA & High Availability</h2>
            <p>
                Our distributed edge architecture delivers a 99.9% uptime SLA with real-time health monitoring, automated failover,
                and zero-downtime deployment pipelines.
            </p>
        </LegalPageLayout>
    );
}
