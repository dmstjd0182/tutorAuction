import { 
    EuiFieldText, 
    EuiTextArea,
    EuiFieldNumber, 
    EuiButton, 
    EuiFormRow, 
    EuiForm 
    } from "@elastic/eui";
import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { FactoryContext } from "../../components/contexts/ContextComponents";

function ProfilePage(props) {
    const {account} = useWeb3React();
    const factory = useContext(FactoryContext);
    const [education, setEducation] = useState('');
    const [career, setCareer] = useState('');
    const [description, setDescription] = useState('');
    const [pay, setPay] = useState(0);
    const [isRegistered, setIsRegistered] = useState(false);
    
    function eduChange(e) {
        setEducation(e.target.value);
    }

    function careerChange(e) {
        setCareer(e.target.value);
    }

    function descriptionChange(e) {
        setDescription(e.target.value);
    }

    function payChange(e) {
        setPay(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(isRegistered){ //이미 가입 된 사람일 경우
            await factory.methods.editProfile(education, career, description, pay*10).send({from: account});
        } else {                //첫 가입일 경우
            await factory.methods.registerTutor(education, career, description, pay*10).send({from: account});
        }
    }

    async function checkRegistered() {
        const tutor = await factory.methods.tutors(account).call();
        if(tutor.isRegistered) {        //프로필 수정일 경우
            setIsRegistered(true);
            setEducation(tutor.education);
            setCareer(tutor.career);
            setDescription(tutor.description);
            setPay(tutor.pay / 10);
        }
    }

    useEffect(() => {
        checkRegistered();
    }, []);

    return(
        <>
        <EuiButton href="/">메인 페이지로 이동</EuiButton>
        {isRegistered &&
        <EuiButton href={`/auction/${account}`}>프로필로 돌아가기</EuiButton>
        }
        <EuiForm>
            <EuiFormRow
                label="최종 학력"
                helpText="학교와 전공을 입력해주세요."
            >
                <EuiFieldText
                    placeholder="필수 입력"
                    value={education}
                    onChange={eduChange}
                />
            </EuiFormRow>
            <EuiFormRow
                label="과외 경력"
            >
                <EuiTextArea
                    placeholder="과외 경력을 입력해주세요."
                    value={career}
                    onChange={careerChange}
                />
            </EuiFormRow>
            <EuiFormRow
                label="자기 소개"
            >
                <EuiTextArea
                    placeholder="자기 소개를 입력해주세요."
                    value={description}
                    onChange={descriptionChange}
                />
            </EuiFormRow>
            <EuiFormRow
                label="시급"
                helpText='만 원 단위로 입력해주세요.'
            >
                <EuiFieldNumber
                    placeholder="필수 입력"
                    value={pay}
                    onChange={payChange}
                    min={0}
                    step={0.5}
                />
            </EuiFormRow>
            <EuiFormRow>
                <EuiButton onClick={handleSubmit} fill>
                    저장
                </EuiButton>
            </EuiFormRow>
        </EuiForm>
        </>
    );
}

export default ProfilePage;