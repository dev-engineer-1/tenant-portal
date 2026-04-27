# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to revolutionize property management by automating tenant communication, maintenance requests, and rent collection. Our AI-driven solution empowers property managers to efficiently handle 3x more properties with the same team, allowing them to focus on growth and tenant satisfaction.

## Problem Solved

Property managers often face overwhelming workloads due to repetitive tasks such as tenant communication, maintenance coordination, and rent collection. NestIQ alleviates these burdens by automating these processes, enabling property managers to streamline operations and improve service quality.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries and streamline communication.
- **Maintenance Request Automation**: Simplify the process of logging, tracking, and resolving maintenance requests.
- **Seamless Rent Collection**: Integrate with Stripe for secure and efficient rent payment processing.
- **Portfolio Management**: Easily connect and manage multiple properties from a single platform.
- **Scalable Solutions**: Designed to grow with your business, supporting property managers with 50+ units.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **Authentication**: JWT, OAuth2
- **Database**: PostgreSQL
- **AI Services**: OpenAI GPT
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Set Up the Environment**
   - Install Python 3.8 or higher.
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add your configuration settings:
     ```
     STRIPE_API_KEY=your_stripe_api_key
     DATABASE_URL=your_database_url
     ```

5. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**
   - Open your browser and navigate to `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with Agentix, leveraging cutting-edge AI technology to transform property management.

For more information, visit our [website](https://nestiq.com) or follow us on [LinkedIn](https://linkedin.com/company/nestiq) and [X](https://twitter.com/nestiq).