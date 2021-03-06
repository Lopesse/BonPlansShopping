<?php
class Categorie
{
    public $categorie;
    public $id;

    public function __construct(PDO $bd)
    {
        $this->bd = $bd;
    }


    public function read()
    {
        $req = "SELECT * FROM categorie WHERE id = :identifiant";
        $stmt = $this->bd->prepare($req);
        $data = array(":identifiant" => $this->id);
        $stmt->execute($data);
        $categorieArray = $stmt->fetch();
        $categorie = array();

        if ($categorieArray) {
            $categorie = array(
                'nom' => $categorieArray['nom'],
                'id' => $categorieArray['id'],
            );
        }
        return $categorie;
    }


    public function readAll()
    {
        $req = "SELECT * FROM categorie";
        $stmt = $this->bd->query($req);
        $queryArray = $stmt->fetchAll();

        $categorieArray = array();

        foreach ($queryArray as $key => $value) {
            $categorie = array(
                'nom' => $value['nom'],
                'id' => $value['id'],
            );
            $categorieArray[$key] = $categorie;
        }
        return $categorieArray;
    }

    public function getSousCategories()
    {
        $req = "SELECT * FROM souscategories";
        $stmt = $this->bd->query($req);
        $queryArray = $stmt->fetchAll();

        $categorieArray = array();

        foreach ($queryArray as $key => $value) {
            $categorie = array(
                'nom' => $value['nom'],
                'id' => $value['id'],
                'categorieParent' => $value['categorieParent']
            );
            $categorieArray[$key] = $categorie;
        }
        return $categorieArray;
    }

    public function getByName($categorie)
    {

        $req = "SELECT * FROM categorie WHERE nom = :categorie";
        $stmt = $this->bd->prepare($req);
        $data = array(":categorie" => $categorie);
        $stmt->execute($data);
        $categorieArray = $stmt->fetch();
        $queryCategorie = array();
        if ($categorieArray) {
            $queryCategorie = array(
                'nom' => $categorieArray['nom'],
                'id' => $categorieArray['id'],
            );
        }
        return $queryCategorie;
    }
}
