import { ApprovalControllerState } from '@metamask/approval-controller';
import { TransactionType } from '@metamask/transaction-controller';

export type SecurityAlertResponse = {
  reason: string;
  features?: string[];
  result_type: string;
  providerRequestsCount?: Record<string, number>;
  securityAlertId?: string;
};

export type SignatureRequestType = {
  chainId?: string;
  id: string;
  msgParams?: {
    from: string;
    origin: string;
    data: string;
  };
  type: TransactionType;
  custodyId?: string;
  securityAlertResponse?: SecurityAlertResponse;
};

export type Confirmation = SignatureRequestType;

export type ConfirmMetamaskState = {
  confirm: {
    currentConfirmation?: Confirmation;
    isScrollToBottomNeeded?: boolean;
  };
  metamask: {
    pendingApprovals: ApprovalControllerState['pendingApprovals'];
    approvalFlows: ApprovalControllerState['approvalFlows'];
  };
};
