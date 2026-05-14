// services.js - обработка форм на странице услуг

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('form-modal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('service-form');
    const phoneInput = document.getElementById('phone');

    // Открытие модального окна при клике на кнопки
    document.querySelectorAll('.order-btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceSelect = document.getElementById('service-type');
            
            // Устанавливаем тип услуги в зависимости от кнопки
            const serviceTypes = ['repair', 'evacuation', 'other'];
            serviceSelect.value = serviceTypes[index] || '';
            
            modal.style.display = 'block';
        });
    });

    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            service: document.getElementById('service-type').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        // Валидация формы
        if (validateForm(formData)) {
            submitForm(formData);
        }
    });

    // Маска для телефона
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
            // Автоматическое форматирование +7 (XXX) XXX-XX-XX
            if (this.value.length === 1 && this.value !== '7') {
                this.value = '7' + this.value;
            }
            if (this.value.length > 1) {
                let formatted = this.value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
                this.value = formatted;
            }
        });
    }

    // Валидация формы
    function validateForm(data) {
        if (!data.name.trim()) {
            alert('Пожалуйста, введите ваше имя');
            return false;
        }
        
        if (!data.phone.trim() || data.phone.replace(/\D/g, '').length < 11) {
            alert('Пожалуйста, введите корректный номер телефона');
            return false;
        }
        
        if (!data.service) {
            alert('Пожалуйста, выберите услугу');
            return false;
        }
        
        return true;
    }

    // Отправка формы (заглушка)
    function submitForm(data) {
        // Здесь будет отправка на сервер
        // Пока используем заглушку
        
        const serviceNames = {
            'repair': 'Ремонт автомобиля',
            'evacuation': 'Эвакуация',
            'other': 'Другая услуга'
        };
        
        const serviceName = serviceNames[data.service] || 'Услуга';
        
        // Показываем сообщение об успехе
        showSuccessMessage(`Спасибо, ${data.name}! Ваша заявка на "${serviceName}" принята. Мы свяжемся с вами по номеру ${data.phone} в течение 15 минут.`);
        
        // Закрываем модальное окно
        modal.style.display = 'none';
        
        // Очищаем форму
        form.reset();
        
        // Можно добавить отправку в Google Forms, Email или Telegram бот
        // sendToTelegram(data);
    }

    // Показать сообщение об успехе
    function showSuccessMessage(message) {
        // Создаем красивый toast вместо alert
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">✅</span>
                <span class="toast-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Показываем toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Убираем toast через 5 секунд
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 5000);
    }
});