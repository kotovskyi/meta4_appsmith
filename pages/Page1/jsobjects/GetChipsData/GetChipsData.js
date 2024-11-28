export default {
  setButtonLabels: () => {
    // Отримуємо дані з getAllUserData
    const workgroup = getAllUserData.data.data.people_assignment[0]?.workgroup;

    // Масив для зберігання назв бізнес-юнітів
    const hierarchy = [];

    // Використовуємо цикл для обходу ієрархії батьків
    let currentGroup = workgroup;
    while (currentGroup) {
      if (currentGroup.name) {
        hierarchy.push(currentGroup.name); // Додаємо поточну назву в масив
      }
      // Переходимо до батьківської групи
      currentGroup = currentGroup.parent && currentGroup.parent[0];
    }

    // Реверсуємо ієрархію, щоб отримати порядок від найвищого рівня до найнижчого
    const reversedHierarchy = hierarchy.reverse();

    // Вибираємо 4 останні бізнес-юніти, додаючи `null`, якщо елементів менше 4
    const buttonLabels = reversedHierarchy.slice(-4).reverse();
    while (buttonLabels.length < 4) {
      buttonLabels.unshift(null); // Додаємо `null`, якщо елементів менше 4
    }

    // Формуємо об'єкт для повернення
    return {
      buttonLabels: buttonLabels, // Назви кнопок
      chipsVisibility: [
        buttonLabels[0] !== null, // Видимість першої кнопки
        buttonLabels[1] !== null, // Видимість другої кнопки
        buttonLabels[2] !== null, // Видимість третьої кнопки
        buttonLabels[3] !== null  // Видимість четвертої кнопки
      ]
    };
  }
};
