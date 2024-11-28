export default {
  imgClickState: (imageId, text) => {
    if (!imageId) {
      console.error("imageId is required");
      return;
    }

    // Список дозволених ідентифікаторів зображень
    const imageIds = ["teamSmalImageManager", "teamSmalImgColleg1", "teamSmalImgColleg2", "teamSmalImgMe"];

    // Перевірка, чи належить `imageId` до дозволених
    if (!imageIds.includes(imageId)) {
      console.error(`Invalid imageId: ${imageId}`);
      return;
    }

    // Отримуємо поточний стан для цієї картинки
    const currentState = appsmith.store[imageId] || false;

    // Скидаємо всі стани для зображень
    imageIds.forEach((id) => {
      storeValue(id, false); // Скидаємо стан
    });

    // Встановлюємо новий стан для обраної картинки
    const newState = !currentState;
    storeValue(imageId, newState);

    // Оновлюємо текст тільки якщо новий стан — активний
    storeValue("selectedImageText", newState ? text : "");
  },

  // Функція для скидання всіх станів
  resetAllStates: () => {
    // Список дозволених ідентифікаторів зображень
    const imageIds = ["teamSmalImageManager", "teamSmalImgColleg1", "teamSmalImgColleg2", "teamSmalImgMe"];

    // Скидаємо всі стани
    imageIds.forEach((id) => {
      storeValue(id, false); // Скидаємо стан
    });

    // Очищуємо текстове поле
    storeValue("selectedImageText", "");
  }
};
