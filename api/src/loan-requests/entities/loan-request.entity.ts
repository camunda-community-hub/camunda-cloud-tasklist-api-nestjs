import {
  ObjectType,
  Field,
  ID,
  Int,
  registerEnumType,
  Float,
} from '@nestjs/graphql';

export enum LoanRequestType {
  car = 'car',
  house = 'house',
  general = 'general',
}
registerEnumType(LoanRequestType, {
  name: 'LoanRequestType',
});
export enum LoanRequestStatus {
  open = 'open',
  resolved = 'resolved',
}
registerEnumType(LoanRequestStatus, {
  name: 'LoanRequestStatus',
});

@ObjectType()
export class LoanRequest {
  @Field(() => ID)
  id: number;
  @Field()
  creationTime: string;
  @Field(() => Int)
  amount: number;
  @Field(() => Int)
  approved: number;
  @Field(() => Int)
  assets: number;
  @Field()
  borrower: string;
  @Field(() => Float)
  creditScore: number;
  @Field(() => Int)
  debt: number;
  @Field(() => String, { nullable: true })
  decisionDate: string | null;
  @Field()
  requestDate: string;
  @Field(() => LoanRequestType)
  type: 'car' | 'house' | 'general';
  @Field(() => LoanRequestStatus)
  status: 'open' | 'resolved';
  @Field(() => Boolean)
  isFirst: boolean;
  @Field(() => [String])
  sortValues: [string, string];
}
