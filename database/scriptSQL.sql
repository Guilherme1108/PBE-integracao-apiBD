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