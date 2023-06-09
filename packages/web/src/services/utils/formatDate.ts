export default function formatDateString(dateString: string) {
	const date = new Date(dateString);
  
	const options: any = {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
  
	return date.toLocaleString("en-US", options);
  }

  