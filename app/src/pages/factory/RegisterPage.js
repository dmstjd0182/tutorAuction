import { 
    EuiFieldText, 
    EuiTextArea,
    EuiFieldNumber, 
    EuiButton, 
    EuiFormRow, 
    EuiForm 
    } from "@elastic/eui";
import { useWeb3React } from "@web3-react/core";
import React, { useContext, useState } from "react";
import { FactoryContext } from "../../components/contexts/ContextComponents";

function RegisterPage(props) {
    const {account} = useWeb3React();
    const factory = useContext(FactoryContext);
    const [education, setEducation] = useState('');
    const [career, setCareer] = useState('');
    const [description, setDescription] = useState('');
    const [pay, setPay] = useState(0);
    
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
        await factory.methods.registerTutor(education, career, description, pay*10).send({from: account});
    }

    return(
        <>
        <br />
        <EuiButton href="/">메인 페이지로 이동</EuiButton>
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
                    가입하기
                </EuiButton>
            </EuiFormRow>
        </EuiForm>
        </>
    );
}

export default RegisterPage;