# NestIQ: AI-Powered Property Management

NestIQ is a B2B SaaS platform designed to revolutionize property management by automating tenant communication, maintenance requests, and rent collection with AI. Our solution enables property managers to efficiently manage three times more properties without expanding their team.

## Problem Solved

Property managers often face overwhelming workloads due to repetitive tasks such as tenant communication, handling maintenance requests, and processing rent payments. NestIQ addresses these challenges by automating these processes, allowing property managers to focus on strategic growth and tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: Streamline communication with AI-driven responses to tenant inquiries.
- **Maintenance Request Management**: Simplify maintenance workflows with automated request handling and tracking.
- **Seamless Rent Collection**: Integrate with Stripe for efficient rent payment processing.
- **Portfolio Integration**: Connect and manage your entire property portfolio from a single platform.
- **Scalable Solution**: Manage up to three times more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: OpenAI GPT-3
- **Database**: PostgreSQL
- **Authentication**: OAuth 2.0
- **Hosting**: AWS

## Getting Started

To get started with NestIQ's tenant portal backend, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   ```plaintext
   STRIPE_API_KEY=your_stripe_api_key
   DATABASE_URL=your_database_url
   ```

4. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Explore API Endpoints**
   - **Rent Payments**: `src/payments/stripe_handler.py`
   - **Tenant Authentication**: `src/auth/tenant_auth.py`
   - **Maintenance Requests**: `src/api/maintenance_routes.py`

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), empowering us to deliver cutting-edge AI solutions for property management.
```