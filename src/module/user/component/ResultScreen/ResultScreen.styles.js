import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
`;

export const ResultsContainer = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%;
`;

export const ContentWrapper = styled.div`
  // display: flex;
  gap: 20px;
  margin-top: 20px;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;

export const SummaryContainer = styled.div`
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  height: fit-content;
  // position: sticky;
  top: 20px;
  align-self: flex-start;
`;

export const SummaryItem = styled.div`
  display: flex;
  // justify-content: space-between;
`;

export const SummaryLabel = styled.span`
  font-weight: 500;
  color: #555;
  width: 50%;
`;

export const SummaryValue = styled.span`
  font-weight: 600;
  color: #333;
  width: 50%;
`;

export const QuestionsContainer = styled.div`
  flex: 1;
  margin-top: 0;
`;

export const QuestionItem = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

export const QuestionText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
  margin-top: 50px;
  color: #333;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #f5f5f5; // Default background for all options
`;

export const OptionBullet = styled.span`
  margin-right: 10px;
  font-weight: bold;
  color: ${({ status }) => {
    switch(status) {
      case 'correct-attempted': return '#4caf50'; // Green for correct attempted
      case 'incorrect-attempted': return '#f44336'; // Red for incorrect attempted
      case 'correct-unattempted': return '#2196f3'; // Blue for correct unattempted
      default: return '#9e9e9e'; // Grey for incorrect unattempted
    }
  }};
`;

export const OptionText = styled.span`
  flex: 1;
  color: ${({ status }) => {
    switch(status) {
      case 'correct-attempted': return '#4caf50';
      case 'incorrect-attempted': return '#f44336';
      case 'correct-unattempted': return '#2196f3';
      default: return '#333'; // Default text color
    }
  }};
`;

export const AnswerStatus = styled.span`
  margin-left: 10px;
  padding: 2px 6px;
  background: #4caf50;
  color: white;
  border-radius: 4px;
  font-size: 12px;
`;

export const QuestionNavButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
`;

export const NavButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background: ${props => props.disabled ? '#f5f5f5' : '#2196f3'};
  color: ${props => props.disabled ? '#9e9e9e' : 'white'};
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${props => props.disabled ? '#f5f5f5' : '#0d8bf2'};
  }
`;
export const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 15px;
`;

export const RetakeButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background:rgb(243, 145, 33);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background:rgb(243, 182, 50);
  }
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  background:rgb(231, 222, 166);
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #e0e0e0;
  }
`;