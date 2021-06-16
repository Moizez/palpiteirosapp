import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { addHours, format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '../../services/api_hunchs'
import HunchModal from '../Modals/HunchModal'
import Snackbar from '../Snackbar'
import { changeFlags } from '../../helpers/data'

import {
    Container, Card, CardHeader, InfoHeader,
    CardHunch, Score, HunchInfo, HunchScoreBox,
    Team, HunchScore, TeamName, Status, HunchText,
    ScoreText, Text, Label, Divider, Modal, Flag
} from './styles'

const NextGamesList = ({ data, idJackpot, isRefresh }) => {

    const [hunch, setHunch] = useState([])
    const [hunchModal, setHunchModal] = useState(false)
    const [showSnack, setShowSnack] = useState(false)
    const [snackColor, setSnackColor] = useState('')
    const [snackTime, setSnackTime] = useState(null)
    const [message, setMessage] = useState('')

    const getHunch = async () => {
        const response = await api.getOneByConfrontationAndJackpotAndUser(data.id, idJackpot)
        setHunch(response.data)
    }

    useEffect(() => {
        getHunch()
    }, [isRefresh])

    const handleHunch = async (idConfrontation, homeGoals, awayGoals, winner) => {

        if (hunch) {
            const response = await api.updateHunchs(hunch.id, idJackpot, idConfrontation, homeGoals, awayGoals, winner)
            console.log(response)
            if (response.data) {
                getHunch()
                setSnackColor('#43aa8b')
                setSnackTime(1500)
                setMessage('Palpite atualizado com sucesso!')
                handleShowSnack()
            } else if (response.status === 400) {
                setSnackColor('#ad2e24')
                setSnackTime(5000)
                setMessage(response.message)
                handleShowSnack()
            } else {
                setSnackColor('#ad2e24')
                setSnackTime(5000)
                setMessage(`Falha inesperada! Erro: ${response.status}`)
                handleShowSnack()
            }
            return
        }

        const response = await api.createHunchs(idJackpot, idConfrontation, homeGoals, awayGoals, winner)
        if (response.data) {
            getHunch()
            setSnackColor('#43aa8b')
            setMessage('Palpite criado com sucesso!')
            handleShowSnack()
        } else if (response.status === 400) {
            setSnackColor('#ad2e24')
            setSnackTime(5000)
            setMessage(response.message)
            handleShowSnack()
        } else {
            setSnackColor('#ad2e24')
            setSnackTime(5000)
            setMessage(`Falha inesperada! Erro: ${response.status}`)
            handleShowSnack()
        }
    }

    const handleOpenHunchModal = () => setHunchModal(true)
    const handleCloseHunchModal = () => setHunchModal(false)
    const handleShowSnack = () => setShowSnack(true)
    const handleCloseSnack = () => setShowSnack(false)

    const dateFormat = (date) => {
        const res = parseISO(date)
        const result = addHours(res, 3)
        return format(result, "d 'de' LLL 'às' H:mm", { locale: pt })
    }

    const getStatus = () => {
        if (hunch?.resultHunch) {
            const isAccuracy = hunch?.resultHunch?.registerHunch?.accuracy;
            const isHit = hunch?.resultHunch?.registerHunch?.accuracy;
            const isNone = !isAccuracy && !isHit;

            if (isAccuracy) {
                return (
                    <>
                        <Status style={{
                            backgroundColor: '#43aa8b',
                            borderRadius: 5,
                        }}>
                            <Text>{'Placar Exato'}</Text>
                        </Status>
                    </>
                )
            } else if (isHit) {
                return (
                    <>
                        <Status style={{
                            backgroundColor: '#1d4e89',
                            borderRadius: 5,
                        }}>
                            <Text>{'Vencedor'}</Text>
                        </Status>
                    </>
                )
            } else if (isNone) {
                return (
                    <>
                        <Status style={{
                            backgroundColor: '#da1e37',
                            borderRadius: 5,
                        }}>
                            <Text>{'Errou'}</Text>
                        </Status>
                    </>
                )
            }
        }
    }

    return (
        <>
            <Container
                onPress={handleOpenHunchModal}
                activeOpacity={0.9}
            >
                <Card
                    style={{ elevation: 3 }}
                    colors={['#ddd', '#f5f3f4']}
                >
                    <CardHeader>
                        <InfoHeader>
                            <Icon name='soccer-field' size={22} color='#072' />
                            <Label>{data.confrontationLocation?.stadium?.name}</Label>
                        </InfoHeader>

                        <InfoHeader>
                            <Icon name='av-timer' size={22} color='#da1e37' />
                            <Label>{dateFormat(data.confrontationLocation?.date)}</Label>
                        </InfoHeader>

                    </CardHeader>

                    <Divider />

                    <CardHunch>
                        <HunchInfo>
                            <Team>
                                <Flag source={changeFlags(data?.teamHome?.initials)} />
                                <TeamName>{data?.teamHome?.initials}</TeamName>
                            </Team>

                            <HunchScoreBox>
                                <HunchScore>
                                    <HunchText>
                                        {(hunch?.resultHunch?.golsHome || hunch?.resultHunch?.golsHome === 0)
                                            ? hunch?.resultHunch?.golsHome
                                            : '__'
                                        }
                                    </HunchText>
                                </HunchScore>
                                <Icon name='alpha-x' size={50} color='#000' />
                                <HunchScore>
                                    <HunchText>
                                        {(hunch?.resultHunch?.golsVisiting || hunch?.resultHunch?.golsVisiting === 0)
                                            ? hunch?.resultHunch?.golsVisiting
                                            : '__'
                                        }
                                    </HunchText>
                                </HunchScore>
                            </HunchScoreBox>
                            <Team>
                                <Flag source={changeFlags(data?.teamVisiting?.initials)} />
                                <TeamName>{data?.teamVisiting?.initials}</TeamName>
                            </Team>
                        </HunchInfo>
                        <Score>
                            {data.scoreBoard &&
                                <>
                                    <ScoreText>{data.scoreBoard?.golsHome}</ScoreText>
                                    <Icon name='alpha-x' size={25} color='#da1e37' />
                                    <ScoreText>{data.scoreBoard?.golsVisiting}</ScoreText>
                                </>
                            }
                        </Score>

                    </CardHunch>

                </Card>
                <Modal
                    visible={hunchModal}
                    animationType='slide'
                    transparent={true}
                >
                    <HunchModal
                        closeModal={handleCloseHunchModal}
                        handleHunch={handleHunch}
                        data={data}
                        golsHome={hunch?.resultHunch?.golsHome}
                        golsAway={hunch?.resultHunch?.golsVisiting}
                        idWinner={hunch?.resultHunch?.classified?.id}
                    />
                </Modal>
                <Modal
                    visible={showSnack}
                    animationType='fade'
                    transparent={true}
                >
                    <Snackbar
                        message={message}
                        onDismiss={handleCloseSnack}
                        hasBgColor
                        hasColor={snackColor}
                        hasBottom='-40%'
                        time={snackTime}
                    />
                </Modal>
            </Container>
        </>
    );
}

export default NextGamesList
