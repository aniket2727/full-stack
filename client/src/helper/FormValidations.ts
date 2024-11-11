
  
type typeStringtonumber={
  projectcost:string
}

export const Emailvalidate = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const Namevalidate = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]{2,30}$/; // Allows letters and spaces, min 2 chars, max 30 chars
    return nameRegex.test(name);
  };
  
  export const Passwordvalidate = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // Minimum 8 characters, at least one letter and one number
    return passwordRegex.test(password);
  };
  
  export const Phonenumbervalidate = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit phone number
    return phoneRegex.test(phone);
  };
  

export const StringtoNumber=({projectcost}:typeStringtonumber):number|string=>{
  const result = parseInt(projectcost, 10);
  if(isNaN(result)){
      return "Please provide a valid numeric string";
  }

  return result;
}
