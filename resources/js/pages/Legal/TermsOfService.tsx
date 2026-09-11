import LegalPageLayout from './LegalPageLayout';

export default function TermsOfService() {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="June 2, 2026">
            <h2 className="text-xl font-bold text-primary mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") 
                and ORBIZ Automotivez ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, 
                media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">2. Intellectual Property Rights</h2>
            <p>
                Unless otherwise indicated, the website is our proprietary property and all source code, databases, functionality, software, 
                website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, 
                service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">3. User Representations</h2>
            <p>
                By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            </ul>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">4. Products and Services</h2>
            <p>
                We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Site. 
                However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, 
                or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.
            </p>

            <h2 className="text-xl font-bold text-primary mt-8 mb-4">5. Modifications and Interruptions</h2>
            <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. 
                However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site 
                without notice at any time.
            </p>
        </LegalPageLayout>
    );
}
