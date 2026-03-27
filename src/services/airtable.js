const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_ID = import.meta.env.VITE_AIRTABLE_TABLE_ID;

// Field mapping from Airtable field names to frontend field names
const fieldMapping = {
  "Event Name": "title",
  "Event Date": "event_date",
  Location: "location",
  Organiser: "organizer",
  "Post URL": "post_url",
  "Account Url": "account_url",
  Image: "image",
  "Raw Caption": "raw_caption",
  Status: "status",
  "Event Description (AI Summary)": "description",
  "Extracted Date": "extracted_date",
};

const mapFieldNames = (fields) => {
  const mapped = {};

  Object.keys(fields).forEach((airtableKey) => {
    const frontendKey = fieldMapping[airtableKey];
    if (frontendKey) {
      mapped[frontendKey] = fields[airtableKey];
    } else {
      // Keep unmapped fields as-is with lowercase and underscores
      const fallbackKey = airtableKey.toLowerCase().replace(/\s+/g, "_");
      mapped[fallbackKey] = fields[airtableKey];
    }
  });

  return mapped;
};

const getImageUrl = (imageField) => {
  if (!imageField || !Array.isArray(imageField) || imageField.length === 0) {
    return "/src/assets/2-avinash-kumar-4Clpyufl_B4-unsplash.jpg"; // fallback image
  }

  return (
    imageField[0].url || "/src/assets/2-avinash-kumar-4Clpyufl_B4-unsplash.jpg"
  );
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch (error) {
    return dateString; // return original if parsing fails
  }
};

const formatTime = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch (error) {
    return ""; // return empty if parsing fails
  }
};

const isEventUpcoming = (eventDate) => {
  if (!eventDate) return false;

  try {
    const eventDateTime = new Date(eventDate);
    const today = new Date();

    // Reset time to start of day for fair comparison
    today.setHours(0, 0, 0, 0);
    eventDateTime.setHours(0, 0, 0, 0);

    return eventDateTime >= today;
  } catch (error) {
    console.error("Error parsing event date:", error);
    return true; // Include events with invalid dates
  }
};

export const fetchEventsFromAirtable = async () => {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    console.warn("Airtable credentials not found. Check your .env file.");
    throw new Error("Airtable credentials not configured");
  }

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Airtable API Error:", errorText);

      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status} - ${errorText}`);
      } else if (response.status >= 500) {
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      } else {
        throw new Error(`HTTP error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    const events = data.records
      .map((record) => {
        const mappedFields = mapFieldNames(record.fields);

        return {
          id: record.id,
          ...mappedFields,
          image: getImageUrl(mappedFields.image),
          date: formatDate(mappedFields.event_date),
          time: formatTime(mappedFields.event_date),
          organizer_link:
            mappedFields.account_url || mappedFields.post_url || "#",
          raw_event_date: mappedFields.event_date,
        };
      })
      .filter((event) => event.status !== "❌")
      .filter((event) => isEventUpcoming(event.raw_event_date));

    return events;
  } catch (error) {
    console.error("Error fetching from Airtable:", error);
    throw error;
  }
};
