# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to streamline operations for real estate property managers. By leveraging AI, we automate tenant communication, maintenance requests, and rent collection, enabling property managers to efficiently manage up to three times more properties with the same team.

## Problem Solved

Property managers often struggle with the repetitive and time-consuming tasks of tenant communication, handling maintenance requests, and collecting rent. NestIQ alleviates these burdens, allowing managers to focus on growing their portfolios and improving tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: Utilize AI-driven chatbots to handle tenant inquiries and updates.
- **Streamlined Maintenance Requests**: Simplify the process of submitting and tracking maintenance tasks.
- **Efficient Rent Collection**: Integrate with Stripe for seamless rent payments and financial tracking.
- **Portfolio Management**: Connect and manage multiple properties from a single dashboard.
- **Scalable Operations**: Manage more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: Natural Language Processing (NLP) for tenant communication
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**
   - Ensure you have Python 3.8+ installed.
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add your configuration settings:
     ```
     STRIPE_API_KEY=your_stripe_api_key
     DATABASE_URL=your_database_url
     ```

4. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access the Tenant Portal**
   - Navigate to `http://localhost:8000` to access the portal and begin managing properties.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.io), ensuring robust and scalable solutions for modern property management challenges.

---

For more information, visit our [website](https://nestiq.com) or follow us on [LinkedIn](https://linkedin.com/company/nestiq) and [X](https://x.com/nestiq).