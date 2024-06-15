
export const jobTypeMap: { [key: number]: string } = {
    1: 'Full Time',
    2: 'Part Time',
    3: 'Contract',
    4: 'Temporary'
    // Add more mappings as needed
  };

  export type JobTypeMap = typeof jobTypeMap;