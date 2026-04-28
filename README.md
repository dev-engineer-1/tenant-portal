# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to help real estate property managers automate tenant communication, maintenance requests, and rent collection. By connecting their portfolio to NestIQ, property managers can efficiently manage three times more properties with the same team.

## Problem Solved

Property managers often face the challenge of handling repetitive and time-consuming tasks, such as tenant communication, maintenance requests, and rent collection. NestIQ leverages AI to automate these operations, allowing property managers to focus on scaling their business and improving tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: AI-driven responses to tenant inquiries.
- **Streamlined Maintenance Requests**: Efficient handling and routing of maintenance issues.
- **Automated Rent Collection**: Secure and timely rent processing via Stripe integration.
- **Scalable Management**: Manage up to 3x more properties with the same resources.
- **Real-Time Analytics**: Insights into property performance and tenant satisfaction.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payment Processing**: Stripe
- **AI**: Custom AI models for communication automation
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

### Prerequisites

- Python 3.8+
- Stripe Account for Payment Processing
- AWS Account for Deployment

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory and add your configuration:

   ```bash
   STRIPE_API_KEY=your_stripe_api_key
   DATABASE_URL=your_database_url
   ```

4. **Run the Application**

   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access the API**

   Navigate to `http://localhost:8000` to access the API documentation and test endpoints.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), ensuring robust AI-driven solutions for property management automation. 

--- 

For more information, visit our [website](https://nestiq.ai) or follow us on [LinkedIn](https://linkedin.com/company/nestiq) and [X](https://x.com/nestiq).