import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Card = styled.TouchableOpacity`
flex: 1;
justify-content: space-between;
width: 100%;
border-radius: 3px;
background-color: #FFF;
padding: 10px;
margin: 5px 0;
`;

export const CardHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const InfoHeader = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CardHunch = styled.View`
    flex: 1;
`;

export const Score = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const HunchInfo = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 10px 0;
`;

export const HunchScore = styled.View`
    width: 50px;
    height: 60px;
    border-width: 1px;
    border-color: #000;
    align-items: center;
    justify-content: center;
`;

export const HunchScoreBox = styled.View`
    flex-direction: row;
`;

export const Team = styled.View`
    align-items: center;
`;

export const Status = styled.View`
    margin: 0 30%;
    margin-top: 5px;
    align-items: center;
    justify-content: center;
`;

export const ScoreText = styled.Text`
    color: #da1e37;
    margin: 5px 2px; 
    font-size: 15px;
`;

export const Image = styled.Image`
    width: 50px;
    height: 50px;
`;

export const TeamName = styled.Text`
    font-size: 12px;
    color: #000;
`;


export const Label = styled.Text`
font-size: 12px;
color: #000;
margin-left: 3px;
`;

export const Text = styled.Text`
    color: #FFF;
`;

export const HunchText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    color: #000;
`;

export const Divider = styled.View`
    width: 100%;
    height: 0.5px;
    background-color: #000;
    margin: 3px 0;
    opacity: 0.2;
`;



