import asyncio

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from db.base import creer_tables
from db.session import engine
from models.item import Voiture


VOITURES = [
    # --- Sportives ---
    dict(nom="Porsche 911 Carrera", categorie="sportive", annee=1973,
         description="Icône intemporelle du coupé sportif allemand.",
         image_url="/static/voitures_catalogue/porsche911_carrera.png",
         constructeur="Porsche", moteur="6 cylindres à plat", puissance=210, pays="Allemagne"),
    dict(nom="Ferrari 308 GTB", categorie="sportive", annee=1975,
         description="Célèbre GT italienne au V8 central.",
         image_url="/static/voitures_catalogue/ferrari308_GTB.png",
         constructeur="Ferrari", moteur="V8", puissance=255, pays="Italie"),
    dict(nom="Lamborghini Countach", categorie="sportive", annee=1974,
         description="Silhouette futuriste devenue mythique.",
         image_url="/static/voitures_catalogue/lamborghini_countach.png",
         constructeur="Lamborghini", moteur="V12", puissance=375, pays="Italie"),
    dict(nom="Chevrolet Corvette C3", categorie="sportive", annee=1968,
         description="Muscle car américaine à la ligne agressive.",
         image_url="/static/voitures_catalogue/chevrolet_corvette.jpg",
         constructeur="Chevrolet", moteur="V8", puissance=300, pays="Etats-Unis"),
    dict(nom="Alpine A110", categorie="sportive", annee=1963,
         description="Légère et agile, star des rallyes français.",
         image_url="/static/voitures_catalogue/alpine_A110.jpg",
         constructeur="Alpine", moteur="4 cylindres", puissance=138, pays="France"),
    dict(nom="Datsun 240Z", categorie="sportive", annee=1969,
         description="Coupé japonais qui a conquis le marché américain.",
         image_url="/static/voitures_catalogue/datsun_240z.jpg",
         constructeur="Datsun", moteur="6 cylindres en ligne", puissance=151, pays="Japon"),
    dict(nom="Toyota Supra Mk4", categorie="sportive", annee=1993,
         description="Culte auprès des passionnés de tuning.",
         image_url="/static/voitures_catalogue/toyota_supra_mk4.jpg",
         constructeur="Toyota", moteur="6 cylindres turbo", puissance=280, pays="Japon"),
    dict(nom="Mazda RX-7", categorie="sportive", annee=1978,
         description="Connue pour son moteur rotatif Wankel.",
         image_url="/static/voitures_catalogue/mazda_Rx7.jpg",
         constructeur="Mazda", moteur="Rotatif", puissance=200, pays="Japon"),
    dict(nom="BMW M3 E30", categorie="sportive", annee=1986,
         description="Référence des berlines sportives compactes.",
         image_url="/static/voitures_catalogue/bmw_m3_e30.jpg",
         constructeur="BMW", moteur="4 cylindres", puissance=200, pays="Allemagne"),
    dict(nom="Jaguar E-Type", categorie="sportive", annee=1961,
         description="Souvent citée comme l'une des plus belles voitures jamais dessinées.",
         image_url="/static/voitures_catalogue/jaguar_Etype.jpg",
         constructeur="Jaguar", moteur="6 cylindres en ligne", puissance=265, pays="Royaume-Uni"),

    # --- Coupés ---
    dict(nom="Mercedes-Benz 300SL Gullwing", categorie="coupe", annee=1955,
         description="Célèbre pour ses portes papillon et son palmarès en course.",
         image_url="/static/voitures_catalogue/Mercedes_300SL_Gullwing.jpg",
         constructeur="Mercedes-Benz", moteur="6 cylindres en ligne (injection)", puissance=215, pays="Allemagne"),
    dict(nom="Citroën SM", categorie="coupe", annee=1970,
         description="Grand tourisme français à la technologie avant-gardiste.",
         image_url="/static/voitures_catalogue/Citro%C3%ABn_SM.jpg",
         constructeur="Citroën", moteur="V6 Maserati", puissance=170, pays="France"),
    dict(nom="Ford Mustang Fastback", categorie="coupe", annee=1967,
         description="Modèle emblématique du pony car américain.",
         image_url="/static/voitures_catalogue/Ford_Mustang_Fastback.jpg",
         constructeur="Ford", moteur="V8", puissance=225, pays="Etats-Unis"),
    dict(nom="Peugeot 504 Coupé", categorie="coupe", annee=1969,
         description="Élégance française signée Pininfarina.",
         image_url="/static/voitures_catalogue/Peugeot_504_Coup%C3%A9.jpg",
         constructeur="Peugeot", moteur="4 cylindres", puissance=97, pays="France"),
    dict(nom="Alfa Romeo GTV", categorie="coupe", annee=1976,
         description="Coupé italien réputé pour sa tenue de route.",
         image_url="/static/voitures_catalogue/Alfa_Romeo_GTV.jpg",
         constructeur="Alfa Romeo", moteur="V6", puissance=160, pays="Italie"),
    dict(nom="Volvo P1800", categorie="coupe", annee=1961,
         description="Ligne racée pour un coupé suédois réputé pour sa fiabilité.",
         image_url="/static/voitures_catalogue/Volvo_P1800.jpg",
         constructeur="Volvo", moteur="4 cylindres", puissance=100, pays="Suède"),
    dict(nom="Honda Prelude", categorie="coupe", annee=1987,
         description="Coupé japonais réputé pour son châssis équilibré.",
         image_url="/static/voitures_catalogue/Honda_Prelude.jpg",
         constructeur="Honda", moteur="4 cylindres", puissance=135, pays="Japon"),
    dict(nom="Opel Manta", categorie="coupe", annee=1970,
         description="Rivale allemande directe de la Ford Capri.",
         image_url="/static/voitures_catalogue/Opel_Manta.jpg",
         constructeur="Opel", moteur="4 cylindres", puissance=90, pays="Allemagne"),
    dict(nom="Renault Alpine A310", categorie="coupe", annee=1971,
         description="Silhouette futuriste héritée de l'A110.",
         image_url="/static/voitures_catalogue/Renault_Alpine_A310.jpg",
         constructeur="Alpine", moteur="V6", puissance=150, pays="France"),
    dict(nom="Fiat 130 Coupé", categorie="coupe", annee=1971,
         description="Grand coupé italien dessiné par Pininfarina.",
         image_url="/static/voitures_catalogue/Fiat_130_Coup%C3%A9.jpg",
         constructeur="Fiat", moteur="V6", puissance=140, pays="Italie"),

    # --- Berlines ---
    dict(nom="Citroën DS", categorie="berline", annee=1955,
         description="Révolutionnaire par sa suspension hydropneumatique.",
         image_url="/static/voitures_catalogue/Citro%C3%ABn_DS.jpg",
         constructeur="Citroën", moteur="4 cylindres", puissance=75, pays="France"),
    dict(nom="Mercedes-Benz W123", categorie="berline", annee=1976,
         description="Réputée pour sa robustesse à toute épreuve.",
         image_url="/static/voitures_catalogue/Mercedes-Benz_W123.jpg",
         constructeur="Mercedes-Benz", moteur="4 cylindres", puissance=95, pays="Allemagne"),
    dict(nom="BMW Série 5 E28", categorie="berline", annee=1981,
         description="Référence de la berline sportive premium.",
         image_url="/static/voitures_catalogue/BMW_S%C3%A9rie_5%20E28.jpg",
         constructeur="BMW", moteur="6 cylindres", puissance=125, pays="Allemagne"),
    dict(nom="Peugeot 504", categorie="berline", annee=1968,
         description="Berline robuste, best-seller africain.",
         image_url="/static/voitures_catalogue/Peugeot_504.jpg",
         constructeur="Peugeot", moteur="4 cylindres", puissance=79, pays="France"),
    dict(nom="Volvo 240", categorie="berline", annee=1974,
         description="Symbole de sécurité et de longévité suédoises.",
         image_url="/static/voitures_catalogue/Volvo_240.jpg",
         constructeur="Volvo", moteur="4 cylindres", puissance=97, pays="Suède"),
    dict(nom="Lancia Beta Berlina", categorie="berline", annee=1972,
         description="Berline italienne au design signé Pininfarina.",
         image_url="/static/voitures_catalogue/Lancia_Beta_Berlina.jpg",
         constructeur="Lancia", moteur="4 cylindres", puissance=90, pays="Italie"),
    dict(nom="Renault 12", categorie="berline", annee=1969,
         description="Berline populaire française à large diffusion.",
         image_url="/static/voitures_catalogue/Renault_12.jpg",
         constructeur="Renault", moteur="4 cylindres", puissance=54, pays="France"),
    dict(nom="Toyota Crown", categorie="berline", annee=1971,
         description="Berline haut de gamme japonaise.",
         image_url="/static/voitures_catalogue/Toyota_Crown.jpg",
         constructeur="Toyota", moteur="6 cylindres en ligne", puissance=115, pays="Japon"),
    dict(nom="Audi 100", categorie="berline", annee=1968,
         description="Première grande berline moderne d'Audi.",
         image_url="/static/voitures_catalogue/Audi_100.jpg",
         constructeur="Audi", moteur="4 cylindres", puissance=85, pays="Allemagne"),
    dict(nom="Chevrolet Impala", categorie="berline", annee=1967,
         description="Grande berline américaine emblématique.",
         image_url="/static/voitures_catalogue/Chevrolet_Impala.jpg",
         constructeur="Chevrolet", moteur="V8", puissance=250, pays="Etats-Unis"),

    # --- SUV / Tout-terrain ---
    dict(nom="Range Rover Classic", categorie="suv", annee=1970,
         description="Pionnier du SUV de luxe britannique.",
         image_url="/static/voitures_catalogue/Range_Rover_Classic.jpg",
         constructeur="Land Rover", moteur="V8", puissance=135, pays="Royaume-Uni"),
    dict(nom="Toyota Land Cruiser 40", categorie="suv", annee=1960,
         description="Tout-terrain increvable, culte au Japon comme en Afrique.",
         image_url="/static/voitures_catalogue/Toyota_Land_Cruiser_40.jpg",
         constructeur="Toyota", moteur="6 cylindres en ligne", puissance=105, pays="Japon"),
    dict(nom="Jeep CJ-5", categorie="suv", annee=1954,
         description="Descendante directe des jeeps militaires américaines.",
         image_url="/static/voitures_catalogue/Jeep_CJ-5.jpg",
         constructeur="Jeep", moteur="4 cylindres", puissance=72, pays="Etats-Unis"),
    dict(nom="Mercedes-Benz Classe G", categorie="suv", annee=1979,
         description="Tout-terrain increvable devenu icône urbaine.",
         image_url="/static/voitures_catalogue/Mercedes_Benz_Classe_G.jpg",
         constructeur="Mercedes-Benz", moteur="6 cylindres", puissance=150, pays="Allemagne"),
    dict(nom="Suzuki Jimny", categorie="suv", annee=1970,
         description="Petit tout-terrain japonais increvable.",
         image_url="/static/voitures_catalogue/Suzuki_Jimny.jpg",
         constructeur="Suzuki", moteur="4 cylindres", puissance=33, pays="Japon"),
    dict(nom="Lada Niva", categorie="suv", annee=1977,
         description="4x4 soviétique réputé pour sa simplicité mécanique.",
         image_url="/static/voitures_catalogue/Lada_Niva.jpg",
         constructeur="Lada", moteur="4 cylindres", puissance=75, pays="URSS"),

    # --- Utilitaires ---
    dict(nom="Citroën Type H", categorie="utilitaire", annee=1947,
         description="Fourgon tôle ondulée devenu icône rétro française.",
         image_url="/static/voitures_catalogue/Citro%C3%ABn_Type_H.jpg",
         constructeur="Citroën", moteur="4 cylindres", puissance=45, pays="France"),
    dict(nom="Volkswagen Combi T1", categorie="utilitaire", annee=1950,
         description="Symbole du van vintage, très recherché en collection.",
         image_url="/static/voitures_catalogue/Volkswagen_Combi%20T1.jpg",
         constructeur="Volkswagen", moteur="4 cylindres à plat", puissance=25, pays="Allemagne"),
    dict(nom="Renault Estafette", categorie="utilitaire", annee=1959,
         description="Utilitaire français à traction avant, très diffusé.",
         image_url="/static/voitures_catalogue/Renault_Estafette.jpg",
         constructeur="Renault", moteur="4 cylindres", puissance=30, pays="France"),
    dict(nom="Ford Transit Mk1", categorie="utilitaire", annee=1965,
         description="Fourgon fondateur d'une longue lignée toujours en production.",
         image_url="/static/voitures_catalogue/Ford_Transit_Mk1.jpg",
         constructeur="Ford", moteur="6 cylindres en ligne", puissance=68, pays="Royaume-Uni"),
]


async def peupler() -> None:
    await creer_tables()

    async with AsyncSession(engine) as session:
        for donnees in VOITURES:
            existe = (
                await session.exec(
                    select(Voiture).where(Voiture.nom == donnees["nom"])
                )
            ).first()

            if existe is None:
                session.add(Voiture(**donnees))
            else:
                existe.image_url = donnees["image_url"]

        await session.commit()

    print(f"Peuplement terminé : {len(VOITURES)} voitures vérifiées/ajoutées.")


if __name__ == "__main__":
    asyncio.run(peupler())