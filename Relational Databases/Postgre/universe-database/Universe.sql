--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_light_years integer,
    distance_in_light_years double precision,
    num_of_stars_in_billion integer,
    year_disc numeric,
    type text
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(50) NOT NULL,
    radius_km integer,
    orbital_period_days numeric(10,1),
    composition text,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(50),
    star_id integer NOT NULL,
    planet_type text,
    has_life boolean,
    orbital_period_days integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet_moon (
    planet_moon_id integer NOT NULL,
    name character varying(50),
    planet_id integer NOT NULL,
    moon_id integer NOT NULL
);


ALTER TABLE public.planet_moon OWNER TO freecodecamp;

--
-- Name: planet_moon_planet_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_moon_planet_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_moon_planet_moon_id_seq OWNER TO freecodecamp;

--
-- Name: planet_moon_planet_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_moon_planet_moon_id_seq OWNED BY public.planet_moon.planet_moon_id;


--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    galaxy_id integer NOT NULL,
    name character varying(50),
    star_type text,
    have_planets boolean,
    number_planets integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: planet_moon planet_moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet_moon ALTER COLUMN planet_moon_id SET DEFAULT nextval('public.planet_moon_planet_moon_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 100000, 0, 400, 1610, 'Spiral');
INSERT INTO public.galaxy VALUES (2, 'Large Magellanic Cloud (LMC)', 14000, 158000, 30, 1519, 'Irregular');
INSERT INTO public.galaxy VALUES (3, 'Andromeda', 220000, 2500000, 1000, 1924, 'Spiral');
INSERT INTO public.galaxy VALUES (4, 'Triangulum', 60000, 3000000, 40, 1654, 'Spiral');
INSERT INTO public.galaxy VALUES (5, 'Small Magellanic Cloud', 19000, 200000, 3, 1522, 'Irregular');
INSERT INTO public.galaxy VALUES (6, 'Sombrero Galaxy', 50000, 29350000, 800, 1781, 'Elliptical');
INSERT INTO public.galaxy VALUES (7, 'Whirlpool Galaxy', 60000, 30000000, 100, 1773, 'Spiral');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon', 1737, 27.0, 'Rocky', 2);
INSERT INTO public.moon VALUES (2, 'Phobos', 11, 0.3, 'Rocky', 3);
INSERT INTO public.moon VALUES (3, 'Deimos', 6, 1.3, 'Rocky', 3);
INSERT INTO public.moon VALUES (4, 'Proxima-b-I', 900, 5.0, 'Ice', 4);
INSERT INTO public.moon VALUES (5, 'Andromeda-1b-I', 2100, 20.0, 'Gas', 5);
INSERT INTO public.moon VALUES (6, 'Triangulum-c-I', 1500, 30.0, 'Ice', 6);
INSERT INTO public.moon VALUES (7, 'Whirlpool-X-I', 3200, 45.0, 'Gas', 7);
INSERT INTO public.moon VALUES (8, 'Sombrero-b-I', 800, 10.0, 'Rocky', 8);
INSERT INTO public.moon VALUES (9, 'LMC-Prime-I', 2500, 40.0, 'Gas', 9);
INSERT INTO public.moon VALUES (10, 'SMC-Orbit-1-I', 1200, 18.0, 'Ice', 10);
INSERT INTO public.moon VALUES (11, 'Helios-IX-a', 1800, 22.0, 'Gas', 11);
INSERT INTO public.moon VALUES (12, 'Helios-IX-b', 1400, 35.0, 'Ice', 11);
INSERT INTO public.moon VALUES (13, 'Andromeda-2c-I', 700, 9.0, 'Rocky', 12);
INSERT INTO public.moon VALUES (14, 'Andromeda-2c-II', 600, 14.0, 'Rocky', 12);
INSERT INTO public.moon VALUES (15, 'Earth-Twin-I', 1600, 26.0, 'Rocky', 2);
INSERT INTO public.moon VALUES (16, 'Mars-Outer-I', 400, 50.0, 'Ice', 3);
INSERT INTO public.moon VALUES (17, 'Triangulum-c-II', 1300, 60.0, 'Ice', 6);
INSERT INTO public.moon VALUES (18, 'Whirlpool-X-II', 2900, 80.0, 'Gas', 7);
INSERT INTO public.moon VALUES (19, 'LMC-Prime-II', 2000, 70.0, 'Gas', 9);
INSERT INTO public.moon VALUES (20, 'Rogue-Moon-X', 1000, 100.0, 'Ice', 11);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 1, 'Terrestrial', false, 88);
INSERT INTO public.planet VALUES (2, 'Earth', 1, 'Terrestrial', true, 365);
INSERT INTO public.planet VALUES (3, 'Mars', 1, 'Terrestrial', false, 687);
INSERT INTO public.planet VALUES (4, 'Proxima b', 2, 'Terrestrial', false, 11);
INSERT INTO public.planet VALUES (5, 'Andromeda-1b', 3, 'Gas Giant', false, 420);
INSERT INTO public.planet VALUES (6, 'Triangulum-c', 4, 'Ice Planet', false, 900);
INSERT INTO public.planet VALUES (7, 'Whirlpool-X', 5, 'Gas Giant', false, 1200);
INSERT INTO public.planet VALUES (8, 'Sombrero-b', 6, 'Rocky', false, 60);
INSERT INTO public.planet VALUES (9, 'LMC-Prime', 7, 'Gas Giant', false, 500);
INSERT INTO public.planet VALUES (10, 'SMC-Orbit-1', 8, 'Terrestrial', false, 300);
INSERT INTO public.planet VALUES (11, 'Helios-IX', 1, 'Gas Giant', false, 2000);
INSERT INTO public.planet VALUES (12, 'Andromeda-2c', 3, 'Terrestrial', false, 150);


--
-- Data for Name: planet_moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet_moon VALUES (1, 'Earth–Moon System', 2, 1);
INSERT INTO public.planet_moon VALUES (2, 'Mars–Phobos Orbit', 3, 2);
INSERT INTO public.planet_moon VALUES (3, 'Mars–Deimos Orbit', 3, 3);
INSERT INTO public.planet_moon VALUES (4, 'Proxima-b Satellite Link', 4, 4);
INSERT INTO public.planet_moon VALUES (5, 'Andromeda Primary Orbit', 5, 5);
INSERT INTO public.planet_moon VALUES (6, 'Triangulum Ice Orbit', 6, 6);
INSERT INTO public.planet_moon VALUES (7, 'Whirlpool Gas Orbit', 7, 7);
INSERT INTO public.planet_moon VALUES (8, 'Sombrero Inner Orbit', 8, 8);
INSERT INTO public.planet_moon VALUES (9, 'LMC Outer Orbit', 9, 9);
INSERT INTO public.planet_moon VALUES (10, 'Helios-IX Inner Orbit', 11, 11);
INSERT INTO public.planet_moon VALUES (11, 'Helios-IX Outer Orbit', 11, 12);
INSERT INTO public.planet_moon VALUES (12, 'Rogue Capture Event', 11, 20);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 1, 'Sun', 'Yellow Dwarf', true, 8);
INSERT INTO public.star VALUES (2, 1, 'Proxima Centauri', 'Red Dwarf', true, 3);
INSERT INTO public.star VALUES (4, 4, 'M33-Red-1', 'Red Giant', true, NULL);
INSERT INTO public.star VALUES (5, 7, 'Whirlpool-A', 'Yellow Giant', true, NULL);
INSERT INTO public.star VALUES (6, 6, 'Sombrero-Core-Star', 'White Dwarf', true, NULL);
INSERT INTO public.star VALUES (7, 2, 'LMC-Star-1', 'Blue Supergiant', true, NULL);
INSERT INTO public.star VALUES (8, 5, 'SMC-Star-Alpha', 'Red Supergiant', true, NULL);
INSERT INTO public.star VALUES (3, 3, 'Alpha Andromedae', 'Blue Giant', true, 1);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 1, false);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 1, false);


--
-- Name: planet_moon_planet_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_moon_planet_moon_id_seq', 12, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 1, false);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 1, false);


--
-- Name: galaxy galaxy_galaxy_id_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_id_key UNIQUE (galaxy_id);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet_moon planet_moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet_moon
    ADD CONSTRAINT planet_moon_name_key UNIQUE (name);


--
-- Name: planet_moon planet_moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet_moon
    ADD CONSTRAINT planet_moon_pkey PRIMARY KEY (planet_moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet_moon planet_moon_moon_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet_moon
    ADD CONSTRAINT planet_moon_moon_id_fkey FOREIGN KEY (moon_id) REFERENCES public.moon(moon_id);


--
-- Name: planet_moon planet_moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet_moon
    ADD CONSTRAINT planet_moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

