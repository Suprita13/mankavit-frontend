import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
`;

export const StatCard = styled.div`
  flex: 1;
//   min-width: 200px;
// width: 100%;
  padding: 15px;
  border-radius: 16px;
  background: #fff;
  color: #000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, #0DCAF0 0%, #007BFF 100%);
    color: #fff;

    ${'' /* ensure internal texts also turn white on hover */}
    div {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    width: none;  
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
  }
`;

export const StatTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
`;

export const StatValue = styled.h2`
  margin-top: 0px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0;
  text-align: left;
`;

export const MenuIcon = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

