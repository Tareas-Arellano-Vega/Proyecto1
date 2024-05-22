*** Settings ***
Library    SeleniumLibrary
Library    BuiltIn

*** Variables ***
${BASE_URL}    http://localhost:3000
${FILTER_DROPDOWN}    css:select[class="select-filtro"]
${FILTER_INPUT}    css:input[class="input-filtro"]
${UPDATE_BUTTON}    css:button[class="btn-actualizar"]
${MEDICO_CARDS}    css:div[class="medico-card"]

*** Test Cases ***

Buscar medico por especialidad
    [Documentation]    Test para buscar médicos por especialidad en la interfaz de usuario
    Open Browser    ${BASE_URL}    chrome    options=add_argument("--ignore-certificate-errors")
    Wait Until Element Is Visible    ${FILTER_DROPDOWN}
    Select From List By Value    ${FILTER_DROPDOWN}    especializacion
    Input Text    ${FILTER_INPUT}    cardiologia
    ##Click Button    ${UPDATE_BUTTON}
    Wait Until Element Is Visible    ${MEDICO_CARDS}
    ${medicos}    Get WebElements    ${MEDICO_CARDS}
    ${medicos_count}    Get Length    ${medicos}
    Should Be True    ${medicos_count} > 0    Deberían existir médicos con la especialidad cardiología
    [Teardown]    Close Browser

Buscar medico por ciudad
    [Documentation]    Test para buscar médicos por ciudad en la interfaz de usuario
    Open Browser    ${BASE_URL}    chrome    options=add_argument("--ignore-certificate-errors")
    Wait Until Element Is Visible    ${FILTER_DROPDOWN}
    Select From List By Value    ${FILTER_DROPDOWN}    ciudad
    Input Text    ${FILTER_INPUT}   Santiago
    #Probar aqui con otra ciudad que no este en la base de datos
    Sleep    0.5s
    ${medicos}    Get WebElements    ${MEDICO_CARDS}
    ${medicos_count}    Get Length    ${medicos}
    Should Be True    ${medicos_count} > 0    Deberían existir médicos en la ciudad de Calama
    [Teardown]    Close Browser

Buscar medico por region
    [Documentation]    Test para buscar médicos por región en la interfaz de usuario
    Open Browser    ${BASE_URL}    chrome    options=add_argument("--ignore-certificate-errors")
    Wait Until Element Is Visible    ${FILTER_DROPDOWN}
    Select From List By Value    ${FILTER_DROPDOWN}    region
    Input Text    ${FILTER_INPUT}    Metropolitana
    Click Button    ${UPDATE_BUTTON}
    Sleep    2s
    ${medicos}    Get WebElements    ${MEDICO_CARDS}
    ${medicos_count}    Get Length    ${medicos}
    Should Be True    ${medicos_count} > 0    Deberían existir médicos en la región Metropolitana
    [Teardown]    Close Browser
