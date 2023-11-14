export const config = {
  runtime: "edge",
};

export default async function handler(request) {
  try {
    const { email, firstName, lastName } = await request.json();

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_API_URL = process.env.SENDGRID_API_URL;

    const response = await fetch(SENDGRID_API_URL, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list_ids: [process.env.SENDGRID_LIST_ID],
        contacts: [{ email, first_name: firstName, last_name: lastName }],
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Throw an error if the request was not successful
      throw new Error("Error adding contact to SendGrid");
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: responseData,
      }),
      {
        status: response.status,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    // Return an error response if something went wrong
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }
}
