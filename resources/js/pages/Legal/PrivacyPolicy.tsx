import LegalPageLayout from './LegalPageLayout';

export default function PrivacyPolicy() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="June 2, 2026">
            <h2 className="text-xl font-bold text-primary mt-8 mb-4">1. Introduction</h2>
            <p>
                Welcome to ORBIZ Automotivez. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">2. The Data We Collect About You</h2>
            <p>
                Personal data, or personal information, means any information about an individual from which that person can be identified. 
                We may collect, use, store and transfer different kinds of personal data about you, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">3. How We Use Your Personal Data</h2>
            <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">4. Data Security</h2>
            <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">5. Contact Us</h2>
            <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us.
            </p>
        </LegalPageLayout>
    );
}
