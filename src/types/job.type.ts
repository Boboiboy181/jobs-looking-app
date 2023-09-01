export type Job = {
  job_id: string;
  employer_logo: string;
  employer_name: string;
  job_title: string;
  job_country: string;
  job_description: string;
  job_employment_type: string;
  job_highlights: {
    Qualifications: string[];
    Responsibilities: string[];
    Benefits: string[];
  };
  job_google_link: string;
};
