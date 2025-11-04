CREATE DATABASE db_locadora_filme_ds2m_25_2;

USE db_locadora_filme_ds2m_25_2;

CREATE TABLE tbl_filme (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    sinopse TEXT,
    data_lancamento DATE,
    duracao TIME NOT NULL,
    orcamento DECIMAL(11,2) NOT NULL,
    trailer VARCHAR(200),
    capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme (nome,sinopse,data_lancamento,duracao,orcamento,trailer,capa)
					   
			VALUES
			('O Rei Leão',
			'Clássico da Disney, a animação acompanha Mufasa (voz de James Earl Jones), o Rei Leão, e a rainha Sarabi (voz de Madge Sinclair), apresentando ao reino o herdeiro do trono, Simba (voz de Matthew Broderick). O recém-nascido recebe a bênção do sábio babuíno Rafiki (voz de Robert Guillaume), mas ao crescer é envolvido nas artimanhas de seu tio Scar (voz de Jeremy Irons), o invejoso e maquiavélico irmão de Mufasa, que planeja livrar-se do sobrinho e herdar o trono.',
			'1994-7-8',
			'01:29',
			45000000.00,
			'https://youtu.be/4ouSqriaQSA?si=PvdAz_OdScHg4U2J',
			'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/84/28/19962110.jpg');
			
			
			
			
INSERT INTO tbl_filme (nome,sinopse,data_lancamento,duracao,orcamento,trailer,capa)
					   
			VALUES
			('Demon Slayer: Kimetsu no Yaiba - Castelo Infinito',
			'Em Demon Slayer: Kimetsu no Yaiba - Castelo Infinito, a vida do jovem Tanjiro muda por completo quando descobre que sua família foi assassinada por uma raça demoníaca conhecida como Onis. A única sobrevivente deste massacre foi Nezuko, irmã de Tanjiro, que não saiu ilesa desse confronto e foi transformada em um demônio. Diante dessa trágica e sombria circunstância, ele parte numa jornada em busca de uma cura para Nezuko. Para isso, decide se juntar a uma organização dedicada a caçar demônios, pronto para também matar o responsável pela morte de seus pais. Enquanto se fortalece e aprofunda seus laços com outros membros da tropa de caçadores, Tanjiro enfrenta diferentes inimigos em parceria com seus companheiros Zenitsu Agatsuma e Inosuke Hashibira. Ao lado também dos espadachins mais poderosos da organização, tudo precisará valer a pena. No rigoroso programa de fortalecimento coletivo, suas habilidades serão precisas para fazê-lo escapar de um espaço misterioso onde ocorrerá a batalha final.',
			'2025-9-11',
			'02:36',
			20000000.00,
			'https://youtu.be/3UiP4GwWNv0?si=nbOYsfs23rMhkmNx',
			'https://br.web.img3.acsta.net/c_310_420/img/9c/0f/9c0f6e33b4fafe1a3490b3fe4b4d7cce.jpg');
            

create table tbl_genero (
id			int primary key auto_increment not null,
nome		varchar(80) not null
);

create table tbl_ator (
id					int primary key auto_increment not null,
nome				varchar(100) not null,
nome_artistico		varchar(100) null,
data_nascimento		date null,
data_falescimento	date null,
altura				decimal (3,2),
biografia			varchar(500) null
);

INSERT INTO tbl_ator (nome, nome_artistico, data_nascimento, data_falescimento, altura, biografia)
VALUES
('Keanu Charles Reeves', 'Keanu Reeves', '1964-09-02', NULL, 1.86,
 'Ator canadense conhecido por papéis marcantes em filmes como Matrix e John Wick. É reconhecido por sua humildade e carisma fora das telas.'),

('Scarlett Ingrid Johansson', 'Scarlett Johansson', '1984-11-22', NULL, 1.60,
 'Atriz norte-americana famosa por interpretar a Viúva Negra no Universo Cinematográfico da Marvel, além de papéis em filmes de drama e ficção científica.'),

('Robin Williams', 'Robin Williams', '1951-07-21', '2014-08-11', 1.70,
 'Ator e comediante norte-americano premiado com o Oscar. Ficou conhecido por filmes como Gênio Indomável, Sociedade dos Poetas Mortos e Uma Babá Quase Perfeita.');

select * from tbl_ator;

create table tbl_personagem (
id			INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome		varchar(200) not null,
idade		varchar(50) null,
descricao	varchar(1000),
papel		varchar(50) not null
);

INSERT INTO tbl_personagem (nome, idade, descricao, papel)
VALUES
('Arthur Pendragon', '35', 'Rei de Camelot, conhecido por sua coragem, sabedoria e pela espada Excalibur. Busca sempre agir com justiça.', 'Protagonista');

INSERT INTO tbl_personagem (nome, idade, descricao, papel)
VALUES
('Morgana Le Fay', '28', 'Feiticeira poderosa e irmã de Arthur. Usa sua magia para desafiar o trono e cumprir seus próprios objetivos.', 'Antagonista');

INSERT INTO tbl_personagem (nome, idade, descricao, papel)
VALUES
('Merlin', '60', 'Mago sábio que serve como conselheiro e mentor de Arthur. Possui vasto conhecimento sobre o mundo mágico.', 'Coadjuvante');


create table tbl_nacionalidade (
id		INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome			varchar(50) not null,
pais_origem		varchar(100) not null
);

INSERT INTO tbl_nacionalidade (nome, pais_origem)
VALUES
('brasileiro', 'Brasil'),
('argentino', 'Argentina'),
('canadense', 'Canadá'),
('japonês', 'Japão'),
('alemão', 'Alemanha');

create table tbl_dublador (
	id					INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome				varchar(100) not null,
	data_nascimento 	date not null,
	data_falescimento	date null
);

INSERT INTO tbl_dublador (nome, data_nascimento, data_falescimento) VALUES
('Orlando Drummond', '1919-10-18', '2021-07-27'),
('Wendel Bezerra', '1974-06-18', NULL),
('Mário Jorge Andrade', '1954-03-14', NULL),
('Isaac Bardavid', '1931-02-13', '2022-02-01'),
('Guilherme Briggs', '1970-07-25', NULL);