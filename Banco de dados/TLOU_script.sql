CREATE DATABASE IF NOT EXISTS theLastOfUs;
-- DROP DATABASE theLastOfUs;

USE theLastOfUs;

-- criando a tabela Usuário
CREATE TABLE IF NOT EXISTS Usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(80) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);

SELECT * FROM usuario;

-- criando a tabela Usuário  
CREATE TABLE IF NOT EXISTS Comentario (
  idComentario INT PRIMARY KEY AUTO_INCREMENT,
  dificuldade VARCHAR(45) NOT NULL,
  comentario VARCHAR(300) NOT NULL UNIQUE,
  fkUsuario INT,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);
  
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
    
CREATE TABLE IF NOT EXISTS inimigo  (
  idInimigo INT PRIMARY KEY AUTO_INCREMENT,
  preferido VARCHAR(11),
  qtdMortes INT,
  fkUsuario INT,
  FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);
  
  SELECT * FROM inimigo;
  
DELIMITER $$
CREATE PROCEDURE vamosVer(IN nome VARCHAR(45), email VARCHAR(80), senha VARCHAR(100), preferido VARCHAR(11), qtdMortes INT)
BEGIN
	
    INSERT INTO usuario VALUES (null, nome, email, senha);
    INSERT INTO inimigo VALUES (null, preferido, qtdMortes, (SELECT max(idUsuario) FROM usuario));
    
END$$
DELIMITER ;

CALL vamosVer('perfeito', 'safmfd', 654165, 'corredor', 20);
-- DROP PROCEDURE vamosVer;

SELECT count(preferido) humano, (SELECT count(preferido) corredor FROM inimigo WHERE preferido = 'corredor') corredor,
	(SELECT count(preferido) perseguidor FROM inimigo WHERE preferido = 'perseguidor') perseguidor,
    (SELECT count(preferido) estalador FROM inimigo WHERE preferido = 'estalador') estalador,
    (SELECT count(preferido) verme FROM inimigo WHERE preferido = 'verme') verme
	FROM inimigo WHERE preferido = 'humano';

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

SELECT * FROM usuario JOIN 
	inimigo ON usuario.idUsuario = fkUsuario WHERE usuario.email = 'dani@gmail.com' and usuario.senha = '1234';