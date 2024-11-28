export default {
  getRandomUsers: () => {
    // Отримуємо дані з результату запиту getMyTeamMembers
    const teamMembers = getMyTeamMembers.data.data.people_assignment;

    // Створюємо масив з обробленими користувачами
    const processedUsers = teamMembers.map(member => ({
      name: member.employee.person.name,
      familyname: member.employee.person.familyname,
      photolink: member.employee.photolink,
      role: member.role,
      email: member.employee.workemail,
      phone: member.employee.person.mobilephone,
      position: member.position.positionname,
      workgroup: member.workgroup.name
    }));

    // Фільтруємо користувачів: виключаємо менеджерів і самого себе
    const filteredUsers = processedUsers.filter(user => {
      return user.role !== "manager" && user.email !== appsmith.user.email;
    });

    // Фільтруємо користувачів з роллю 'manager' (для повернення окремо)
    const managers = processedUsers.filter(user => user.role === "manager");

    // Перевірка, чи є менеджери
    const manager = managers.length > 0
      ? { 
          name: managers[0].name,
          familyname: managers[0].familyname,
          photolink: managers[0].photolink,
          email: managers[0].email,
          phone: managers[0].phone,
          position: managers[0].position,
          workgroup: managers[0].workgroup
        }
      : null;

    // Функція для випадкового вибору двох різних користувачів
    let randomUsers = [];
    while (randomUsers.length < 2 && filteredUsers.length > 1) {
      const randomIndex = Math.floor(Math.random() * filteredUsers.length);
      const user = filteredUsers[randomIndex];

      // Перевірка, чи є цей користувач вже в списку
      if (!randomUsers.includes(user)) {
        randomUsers.push(user);
      }
    }

    // Встановлюємо параметр видимості для користувачів
    const isVisibleUser1 = randomUsers.length > 0;
    const isVisibleUser2 = randomUsers.length > 1;
    const isVisibleManager = manager !== null;

    // Зберігаємо вибраних користувачів у store для подальшого використання
    storeValue("selectedUser1", randomUsers[0] || null);
    storeValue("selectedUser2", randomUsers[1] || null);
    storeValue("isVisibleUser1", isVisibleUser1);
    storeValue("isVisibleUser2", isVisibleUser2);
    storeValue("isVisibleManager", isVisibleManager);

    // Повертаємо дані для подальшого використання
    return {
     user1: randomUsers[0],  // Повертаємо першого користувача
      user2: randomUsers[1],   // Повертаємо другого користувача
      isVisibleUser1,                        // Видимість першого користувача
      isVisibleUser2,                        // Видимість другого користувача
      isVisibleManager,                      // Видимість менеджера (true/false)
      manager                                // Менеджер або null
    };
  }
};
