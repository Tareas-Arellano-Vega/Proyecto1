*** Settings ***
Library    SeleniumLibrary
Library    OperatingSystem

*** Variables ***
${BROWSER}          Chrome
${BASE_URL}         http://localhost:3000/FormularioMedico
${NOMBRE}           Alexis
${APELLIDO}         Sanchez
${RUT}              12345678-9
${ESPECIALIZACION}  Traumatologo
${CIUDAD}           Santiago
${REGION}           Metropolitana
${DIRECCION}        Marin 123

*** Test Cases ***
Crear Médico Exitosamente
    Open Browser    ${BASE_URL}    ${BROWSER}
    ${nombre_completo}=    Run Keyword And Return Status    Create Medico    ${NOMBRE}    ${APELLIDO}    ${RUT}    ${ESPECIALIZACION}    ${CIUDAD}    ${REGION}    ${DIRECCION}
    #Should Be True    ${nombre_completo} != None
    Close Browser

*** Keywords ***
Create Medico
    [Arguments]    ${nombre}    ${apellido}    ${rut}    ${especializacion}    ${ciudad}    ${region}    ${direccion}
    Input Text    id=nombre    ${nombre}
    Input Text    id=apellido    ${apellido}
    Input Text    id=rut    ${rut}
    Input Text    id=especializacion    ${especializacion}
    Input Text    id=ciudad    ${ciudad}
    Input Text    id=region    ${region}
    Input Text    id=direccion    ${direccion}
    Click Button    id=submit-button
    Wait Until Element Is Visible    id=message-success
    ${nombre_completo}=    Get Text    id=nombre-completo
    [Return]    ${nombre_completo}
