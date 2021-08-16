export declare enum LoanRequestType {
    car = "car",
    house = "house",
    general = "general"
}
export declare enum LoanRequestStatus {
    open = "open",
    resolved = "resolved"
}
export declare class LoanRequest {
    id: number;
    creationTime: string;
    amount: number;
    approved: number;
    assets: number;
    borrower: string;
    creditScore: number;
    debt: number;
    decisionDate: string | null;
    requestDate: string;
    type: 'car' | 'house' | 'general';
    status: 'open' | 'resolved';
    isFirst: boolean;
    sortValues: [string, string];
}
