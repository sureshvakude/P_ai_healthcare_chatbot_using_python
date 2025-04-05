// utils/send-mail.ts

interface SendEmailRequest {
    to: string;
    subject: string;
    message: string;
  }
  
  interface SendEmailResponse {
    success: boolean;
    message: string;
  }
  
  const sendEmail = async (data: SendEmailRequest): Promise<SendEmailResponse> => {
    try {
      const response = await fetch('http://127.0.0.1:5000/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result: SendEmailResponse = await response.json();
  
      if (response.ok) {
        return {
          success: true,
          message: result.message,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Failed to send email',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  };
  
  export default sendEmail;