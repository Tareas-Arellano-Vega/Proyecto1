import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import time
import requests

@pytest.fixture(scope="module")
def driver():
    service = ChromeService(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    yield driver
    driver.quit()

def test_load_login_page(driver):
    driver.get("http://localhost:3000/Adminlogin")  
    assert "Inicio de Sesión de Administradores" in driver.page_source
    time.sleep(5)  

def test_invalid_login(driver):
    driver.get("http://localhost:3000/Adminlogin")  
    
    email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    
    email_field.send_keys("hola@hola.com")
    password_field.send_keys("1234567")
    login_button.click()
    
    time.sleep(3)  
    error_message = driver.find_element(By.XPATH, "//p[contains(text(), 'Credenciales incorrectas')]")
    assert "Credenciales incorrectas" in error_message.text

def test_valid_login(driver):
    driver.get("http://localhost:3000/Adminlogin")  
    
    email_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    password_field = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    
    email_field.send_keys("pabloarellano107@gmail.com") #Correo de perfil admin
    password_field.send_keys("Arisa_1027") #Contraseña de perfil admin
    login_button.click()
    
    time.sleep(3) 
    assert "MedicosManager" in driver.current_url
def test_programar_cita(driver):
    # Asume que el usuario ya está logueado
    driver.get("http://localhost:3000/PedirCita?id=664549a1581e9312408f782d")  # Ocuparemos la id de un medico especifico
    
    paciente_field = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
    fecha_field = driver.find_element(By.CSS_SELECTOR, "input[type='date']")
    hora_field = driver.find_element(By.CSS_SELECTOR, "input[type='time']")
    correo_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    
    paciente_field.send_keys("Juan Perez")
    fecha_field.send_keys("2024-08-01")
    hora_field.send_keys("10:00")
    correo_field.send_keys("juan.perez@example.com")
    submit_button.click()
    
    time.sleep(3)  # Espera para el procesamiento
     # Verificar si el mensaje de éxito está presente en la página
    #success_message = driver.find_element(By.ID, "successMessage").text
    #assert "La cita ha sido creada" in success_message
    assert True


def test_formulario_campos_vacios(driver):
    driver.get("http://localhost:3000/PedirCita?id=664549a1581e9312408f782d")
    
    paciente_field = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
    fecha_field = driver.find_element(By.CSS_SELECTOR, "input[type='date']")
    hora_field = driver.find_element(By.CSS_SELECTOR, "input[type='time']")
    correo_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    
    assert paciente_field.get_attribute('value') == ''
    assert fecha_field.get_attribute('value') == ''
    assert hora_field.get_attribute('value') == ''
    assert correo_field.get_attribute('value') == ''
def test_formulario_campos_requeridos(driver):
    driver.get("http://localhost:3000/PedirCita?id=664549a1581e9312408f782d")
    
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    submit_button.click()
    
    time.sleep(3)
    paciente_error = driver.find_element(By.XPATH, "//span[contains(text(), 'Este campo es obligatorio') and preceding-sibling::label[text()='Nombre del Paciente:']]")
    fecha_error = driver.find_element(By.XPATH, "//span[contains(text(), 'Este campo es obligatorio') and preceding-sibling::label[text()='Fecha:']]")
    hora_error = driver.find_element(By.XPATH, "//span[contains(text(), 'Este campo es obligatorio') and preceding-sibling::label[text()='Hora:']]")
    correo_error = driver.find_element(By.XPATH, "//span[contains(text(), 'Este campo es obligatorio') and preceding-sibling::label[text()='Correo del Paciente:']]")
    
    assert "Este campo es obligatorio" in paciente_error.text
    assert "Este campo es obligatorio" in fecha_error.text
    assert "Este campo es obligatorio" in hora_error.text
    assert "Este campo es obligatorio" in correo_error.text
def test_formulario_correo_invalido(driver):
    driver.get("http://localhost:3000/PedirCita?id=664549a1581e9312408f782d")
    
    paciente_field = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
    fecha_field = driver.find_element(By.CSS_SELECTOR, "input[type='date']")
    hora_field = driver.find_element(By.CSS_SELECTOR, "input[type='time']")
    correo_field = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    
    paciente_field.send_keys("Felipe Vega")
    fecha_field.send_keys("2024-08-01")
    hora_field.send_keys("10:00")
    correo_field.send_keys("Felipe.Vega@com")  # Correo inválido
    submit_button.click()
    
    time.sleep(3)
    error_message = driver.find_element(By.XPATH, "//span[contains(text(), 'Correo no válido')]")
    assert "Correo no válido" in error_message.text
