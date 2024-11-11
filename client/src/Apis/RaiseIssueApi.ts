import axios from 'axios';

type IssueDetailsData = {
  name: string;
  email: string;
  selectedProblem: string;
  issueDescription: string;
};

export const AddnewIssueApi = async (issueDetails: IssueDetailsData) => {
  const response = await axios.post('http://localhost:9009/api/issueadd', issueDetails);
  return response.data;
};
