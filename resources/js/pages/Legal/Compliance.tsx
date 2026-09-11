import LegalPageLayout from './LegalPageLayout';

export default function Compliance() {
    return (
        <LegalPageLayout title="Compliance & Certifications" lastUpdated="June 2, 2026">
            <h2 className="text-xl font-bold text-primary mt-8 mb-4">1. Commitment to Quality</h2>
            <p>
                At ORBIZ Automotivez, we are dedicated to maintaining the highest standards of quality, security, and environmental responsibility 
                in all our manufacturing processes. Our compliance framework is built upon internationally recognized standards and local regulatory requirements.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">2. ISO Certifications</h2>
            <p>
                We proudly operate under strict ISO management systems:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>ISO 9001:2015</strong> - Quality Management Systems ensuring consistent delivery of products that meet customer and regulatory requirements.</li>
                <li><strong>ISO 14001:2015</strong> - Environmental Management Systems demonstrating our commitment to sustainable and environmentally conscious manufacturing.</li>
                <li><strong>ISO 7591:1982</strong> - Road vehicles — Retro-reflective registration plates for motor vehicles and trailers — Specification.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">3. High Security Registration Plates (HSRP) Compliance</h2>
            <p>
                Our HSRP products are rigorously tested and certified by the Automotive Research Association of India (ARAI) and the 
                International Centre for Automotive Technology (ICAT). We strictly adhere to Rule 50 of the Central Motor Vehicles Rules, 1989.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">4. International Standards</h2>
            <p>
                For our global clients, we ensure full compliance with the specific regulatory requirements of each importing country, 
                including CE marking where applicable, and adherence to European standard DIN 74069.
            </p>
        </LegalPageLayout>
    );
}
