

import axios from "axios";


type Issuedetailsdata={
    name:string
};



export const AddnewIssueApi=async(IssueDetails:Issuedetailsdata)=>{
    const responce=await axios.post('http://localhost:9009/api/projectdetails', IssueDetails);
    return responce.data;
}