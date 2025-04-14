--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

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
-- Name: machine_readings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.machine_readings (
    id integer NOT NULL,
    machine_id uuid,
    "timestamp" timestamp with time zone NOT NULL,
    power_watts double precision,
    status text
);


--
-- Name: machine_readings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.machine_readings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: machine_readings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.machine_readings_id_seq OWNED BY public.machine_readings.id;


--
-- Name: machines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.machines (
    id uuid NOT NULL,
    name text NOT NULL
);


--
-- Name: machine_readings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machine_readings ALTER COLUMN id SET DEFAULT nextval('public.machine_readings_id_seq'::regclass);


--
-- Data for Name: machine_readings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.machine_readings (id, machine_id, "timestamp", power_watts, status) FROM stdin;
\.


--
-- Data for Name: machines; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.machines (id, name) FROM stdin;
\.


--
-- Name: machine_readings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.machine_readings_id_seq', 1, false);


--
-- Name: machine_readings machine_readings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machine_readings
    ADD CONSTRAINT machine_readings_pkey PRIMARY KEY (id);


--
-- Name: machines machines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machines
    ADD CONSTRAINT machines_pkey PRIMARY KEY (id);


--
-- Name: machine_readings machine_readings_machine_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.machine_readings
    ADD CONSTRAINT machine_readings_machine_id_fkey FOREIGN KEY (machine_id) REFERENCES public.machines(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

