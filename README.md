# NestIQ: Automate Your Property Management

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection using AI. Our platform enables property managers to efficiently handle up to three times more properties with the same team.

## Problem Solved

Property managers often face the challenge of juggling numerous repetitive tasks that consume valuable time and resources. NestIQ streamlines these operations, allowing managers to focus on growing their portfolios and enhancing tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: Streamline interactions with tenants using AI-driven messaging.
- **Maintenance Request Management**: Simplify the process of handling and tracking maintenance requests.
- **Rent Collection Automation**: Facilitate seamless rent payments with integrated payment solutions.
- **Portfolio Integration**: Easily connect and manage your property portfolio within a single platform.
- **Scalable Management**: Increase your property management capacity without expanding your team.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **Authentication**: JWT
- **Database**: PostgreSQL
- **AI**: OpenAI GPT
- **Deployment**: Docker, AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Set Up the Environment**:
   Ensure you have Python 3.8+ installed. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file and add your configuration details:
   ```env
   DATABASE_URL=your_database_url
   STRIPE_API_KEY=your_stripe_api_key
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

5. **Run the Application**:
   Start the FastAPI server:
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**:
   Visit `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://www.agentix.ai), leveraging cutting-edge AI technology to transform property management.

---
```