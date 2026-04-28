# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to revolutionize the way real estate property managers handle tenant communication, maintenance requests, and rent collection. By automating these repetitive tasks, NestIQ empowers property managers to efficiently manage up to three times more properties with the same team.

## Problem Solved

Property managers often face overwhelming workloads due to manual processes involved in tenant communication, maintenance coordination, and rent collection. NestIQ addresses these challenges by automating these operations, allowing property managers to focus on growth and tenant satisfaction.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries and streamline communication.
- **Maintenance Request Automation**: Efficiently manage and track maintenance requests with a simple, intuitive interface.
- **Automated Rent Collection**: Seamlessly handle rent payments with integrated payment processing.
- **Portfolio Integration**: Easily connect and manage your property portfolio within a single platform.
- **Scalable Management**: Manage more properties without increasing your team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **Authentication**: OAuth2
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**:
   - Ensure you have Python 3.8+ installed.
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory and set the following variables:
     ```
     DATABASE_URL=your_database_url
     STRIPE_API_KEY=your_stripe_api_key
     ```

4. **Run the Application**:
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access the API**:
   - The API will be available at `http://localhost:8000`.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), leveraging cutting-edge AI technologies to transform property management. 

For any inquiries or support, please contact us at support@nestiq.com.