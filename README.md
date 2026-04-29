# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. By integrating AI-driven solutions, NestIQ enables property managers to efficiently manage up to three times more properties with the same team.

## Problem Solved

Property managers often face the challenge of handling repetitive tasks that consume valuable time and resources. NestIQ addresses this issue by automating these operations, allowing property managers to focus on strategic growth and tenant satisfaction.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries.
- **Maintenance Request Automation**: Streamline the process of handling and tracking maintenance requests.
- **Automated Rent Collection**: Simplify rent collection with integrated payment solutions.
- **Portfolio Integration**: Seamlessly connect and manage your property portfolio.
- **Scalable Management**: Manage more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **AI**: TensorFlow, OpenAI GPT
- **Payments**: Stripe API
- **Database**: PostgreSQL
- **Authentication**: JWT, OAuth2
- **Deployment**: Docker, AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Set Up the Environment**

   Ensure you have Python 3.8+ installed. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and add necessary configurations:

   ```plaintext
   DATABASE_URL=your_database_url
   STRIPE_API_KEY=your_stripe_api_key
   SECRET_KEY=your_secret_key
   ```

5. **Run the Application**

   Start the FastAPI server:

   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**

   Visit `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), leveraging cutting-edge AI technology to transform property management.