// src/types/types.ts

export interface GeneralInfo {
  id: string;
  organization: string;
  fullName: string;
  email: string;
  dateJoined: string;
  phoneNumber: string;
  status: string;
  hasLoan: boolean;
  hasSavings: boolean;
}

export interface PersonalInfo {
  userTier: number;
  email: string;
  gender: string;
  maritalStatus: string;
  children: number;
  typeOfResidence: string;
}

export interface EmploymentInfo {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  organization: string;
}

export interface BankInfo {
  name: string;
  accountNumber: string;
  bvn: string;
}

export interface SocialsInfo {
  twitter: string;
  facebook: string;
  instagram: string;
}

export interface GuarantorInfo {
  fullName: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface User {
  generalInfo: GeneralInfo;
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  bank: BankInfo;
  socials: SocialsInfo;
  guarantor: GuarantorInfo;
}

export interface UserContextType {
  users: User[];
  fetchUsers: () => void;
  updateUserStatus: (userId: string, newStatus: string) => void;
}
