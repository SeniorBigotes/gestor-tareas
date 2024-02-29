/*users*/
INSERT INTO users (name, last_name, maiden_name, gender, phone, photo_url, specialization,
  state, country, registration_date, last_connection, notifications) 
VALUES
  ('John', 'Doe', 'Maiden', 'Hombre', '123456789', 'http://urldelejemplo.com/john.jpg', 'Desarrollador Web', 'California', 'Estados Unidos', '2023-01-15', '2023-01-16', true),
  ('Jane', 'Smith', 'Maiden', 'Mujer', '987654321', 'http://urldelejemplo.com/jane.jpg', 'Diseñador Gráfico', 'Nueva York', 'Estados Unidos', '2023-01-15', '2023-01-16', false),
  ('Bob', 'Johnson', 'Maiden', 'Hombre', '555666777', 'http://urldelejemplo.com/bob.jpg', 'Ingeniero de Software', 'Texas', 'Estados Unidos', '2023-01-15', '2023-01-16', true),
  ('Alice', 'Williams', 'Maiden', 'Mujer', '111222333', 'http://urldelejemplo.com/alice.jpg', 'Analista de Datos', 'Florida', 'Estados Unidos', '2023-01-15', '2023-01-16', false),
  ('Carlos', 'Gomez', 'Maiden', 'Hombre', '777888999', 'http://urldelejemplo.com/carlos.jpg', 'Arquitecto de Sistemas', 'California', 'Estados Unidos', '2023-01-15', '2023-01-16', true),
  ('Maria', 'Rodriguez', 'Maiden', 'Mujer', '444555666', 'http://urldelejemplo.com/maria.jpg', 'Desarrollador de Apps', 'Texas', 'Estados Unidos', '2023-01-15', '2023-01-16', false);

/*activities*/
INSERT INTO activities (task, description, date_start, date_end, date_update,
  progress, complete, auth, group_id)
VALUES
  ('Hacer presentación', 'Preparar slides y ensayar', '2023-01-25', '2023-01-28', '2023-01-27', 70, false, 1, null),
  ('Desarrollar nueva función', 'Programar y realizar pruebas', '2023-02-01', '2023-02-10', '2023-02-09', 50, false, 2, null),
  ('Reunión de equipo', 'Planificar y discutir proyectos', '2023-02-15', '2023-02-15', '2023-02-15', 100, true, 3, null),
  ('Optimizar base de datos', 'Realizar mejoras de rendimiento', '2023-02-22', '2023-02-28', '2023-02-27', 80, false, 4, null),
  ('Entrenamiento', 'Participar en taller de desarrollo', '2023-03-05', '2023-03-08', '2023-03-07', 90, true, 5, null),
  ('Revisión de código', 'Evaluar y corregir código fuente', '2023-03-15', '2023-03-20', '2023-03-19', 60, false, 6, null);

/*subtasks*/
INSERT INTO subtasks (task, priority, date_start, date_end,
  date_complete, complete, activity_id, auth, assigned_to)
VALUES
  ('Revisar contenido', 'Media', '2023-01-25', '2023-01-27', '2023-01-27', true, 1, 1, 2),
  ('Implementar funcionalidad', 'Alta', '2023-02-01', '2023-02-10', null, false, 1, 2, 3),
  ('Analizar datos', 'Baja', '2023-02-15', '2023-02-20', '2023-02-20', true, 2, 4, null),
  ('Optimizar consultas', 'Urgente', '2023-02-22', '2023-02-28', null, false, 3, 3, null),
  ('Preparar presentación', 'Alta', '2023-03-05', '2023-03-08', '2023-03-08', true, 3, 3, 5),
  ('Revisar código', 'Media', '2023-03-15', '2023-03-20', null, false, 3, 4, 6);

/*events*/
INSERT INTO events (name, description, date, user_id, group_id)
VALUES
  ('Reunión de equipo', 'Discutir planes para el próximo proyecto', '2023-01-30', 1, null),
  ('Conferencia virtual', 'Explorar nuevas tecnologías', '2023-02-10', 2, null),
  ('Fiesta de cumpleaños', 'Celebrar el cumpleaños de Juan', '2023-02-15', 3, null),
  ('Seminario de desarrollo personal', 'Charla sobre habilidades de liderazgo', '2023-03-05', 1, null),
  ('Presentación de resultados', 'Mostrar los resultados del último trimestre', '2023-03-20', 2, null),
  ('Taller de trabajo en equipo', 'Actividades prácticas para fortalecer el trabajo en equipo', '2023-04-01', 3, null);
  
  /*groups*/
INSERT INTO groups (name, description, photo_url, invitation_code,
	creation_date, privacy)
VALUES
  ('Equipo de Desarrollo', 'Grupo dedicado al desarrollo de software', 'https://example.com/team-photo.jpg', 'ABC123', '2022-01-25', true),
  ('Club de Lectura', 'Compartir y discutir libros interesantes', 'https://example.com/book-club.jpg', 'XYZ456', '2022-02-10', false),
  ('Proyecto de Investigación', 'Grupo enfocado en investigaciones científicas', 'https://example.com/research-project.jpg', '123DEF', '2022-03-05', true),
  ('Grupo de Deportes', 'Participar en actividades deportivas y mantenerse activo', 'https://example.com/sports-group.jpg', '789GHI', '2022-03-20', false),
  ('Club de Cocina', 'Compartir recetas y experiencias culinarias', 'https://example.com/cooking-club.jpg', '456JKL', '2022-04-01', true),
  ('Grupo de Música', 'Amantes de la música que comparten sus gustos y descubrimientos', 'https://example.com/music-group.jpg', 'MNO321', '2022-04-15', false);
  
/*participants*/
INSERT INTO participants_groups (user_id, group_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(1, 2),
(2, 2);

/*auths*/
INSERT INTO auths_groups (user_id, group_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

/*notes*/
INSERT INTO NOTES (note, activity_id, subtask_id, auth_id) VALUES 
('Investigar sobre el patrón de diseño Singleton en Java', null, 6, 3),
('Leer el artículo sobre las novedades de ES2020 en JavaScript.', null, 6, 3),
('Practicar el uso de expresiones regulares en Python.', null, 6, 3),
('Revisar la documentación de React Hooks para mejorar el rendimiento en componentes funcionales.', null, 5, 3),
('Experimentar con la API de localStorage en HTML5 para almacenar datos localmente en el navegador', null, 5, 3),
('Estudiar los principios de diseño SOLID y aplicarlos en el desarrollo de software', null, 4, 3),
('Investigar sobre las diferencias entre REST y GraphQL para elegir la mejor opción en futuros proyectos de API.', null, 4, 3),
('Resolver el desafío de programación de HackerRank sobre estructuras de datos', null, 3, 2),
('Participar en un curso en línea sobre desarrollo de aplicaciones móviles con Flutter', null, 3, 2),
('Configurar un entorno de desarrollo local con Docker para facilitar la colaboración en equipo.', null, 3, 2);