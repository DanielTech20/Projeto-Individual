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
  comentario VARCHAR(80) NOT NULL UNIQUE,
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





-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
);

CREATE TABLE aviso (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY AUTO_INCREMENT,
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

create table medida (
	id INT PRIMARY KEY AUTO_INCREMENT,
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT,
	FOREIGN KEY (fk_aquario) REFERENCES aquario(id)
);


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
