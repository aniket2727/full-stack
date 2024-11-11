

import {Namevalidate }   from '../FormValidations';

type data={
    projectname:string;
    projectmanager:string;
}

export const AdminprojectUpdateValidations=({projectname,projectmanager}:data):boolean=>{

    const validateprojectname=Namevalidate(projectname);

    const validateprojectmanager=Namevalidate(projectmanager);
     
    if(validateprojectname && validateprojectmanager){
        return true;
    }

    return false;
  
};


export const StringtoNumber = ({ projectcost }: { projectcost: string }): number => {
    const parsedNumber = parseInt(projectcost);
    return isNaN(parsedNumber) ? NaN : parsedNumber;
};



