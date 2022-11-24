CREATE DATABASE IF NOT EXISTS theLastOfUs;

USE theLastOfUs;

-- criando a tabela Usuário
CREATE TABLE IF NOT EXISTS Usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(80) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);
  
INSERT INTO usuario VALUES
  (null, 'Daniel', 'danielsebastian@gmail.com', '1234');
  
SELECT * FROM usuario;

-- criando a tabela Usuário  
CREATE TABLE IF NOT EXISTS Comentario (
  idComentario INT AUTO_INCREMENT,
  dificuldade VARCHAR(45) NOT NULL,
  comentario VARCHAR(80) NOT NULL UNIQUE,
  fkUsuario INT,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
  PRIMARY KEY (idComentario, fkUsuario)
  );
  
  INSERT INTO Comentario VALUES 
  (null, 'Difícil', 'Olá pessoal, isso é apenas um teste', 1);
  
  SELECT * FROM Comentario;
  
  SELECT 
	c.idComentario,
    c.dificuldade,
    c.comentario,
    c.fkUsuario,
	u.idUsuario,
	u.nome,
    u.email,
    u.senha
  FROM Comentario c 
	JOIN Usuario u ON c.fkUsuario = u.idUsuario;
    
  CREATE TABLE IF NOT EXISTS inimigoPreferido (
  idInimigo INT AUTO_INCREMENT,
  inimigo VARCHAR(11),
  fkUsuario INT,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
  PRIMARY KEY (idInimigo, fkUsuario)
  );