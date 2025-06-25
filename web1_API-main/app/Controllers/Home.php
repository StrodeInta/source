<?php

namespace App\Controllers;

class Home extends BaseController
{
    function __construct(){
            $db  = \Config\Database::connect();
            $this->builder = $db->table('posts');
            
    }



    public function index()
    {
        // $data = [
        //     "title" => "Page1",
        //     "content" => "This is page 1",
        //     "img" => "https://codeigniter.com/assets/icons/44521256.png"
        // ];

        // return $this->response->setJSON($data);
 
        return view('react');
    }

     public function show_users($userId = "")
     {
       $users = [
            [
                'id'=>1,
                'name' => 'Jānis',
                'surname' => 'Ozoliņš',
                'email' => 'janis.ozolins@example.com',
                'password' => password_hash('Parole123', PASSWORD_DEFAULT),
                'address' => 'Brīvības iela 1, Rīga, LV-1010'
            ],
            [
                'id'=>2,
                'name' => 'Laura',
                'surname' => 'Liepa',
                'email' => 'laura.liepa@example.com',
                'password' => password_hash('ManaParole!', PASSWORD_DEFAULT),
                'address' => 'Skolas iela 15, Jelgava, LV-3001'
            ],
            [
                'id'=>3,
                'name' => 'Mārtiņš',
                'surname' => 'Bērziņš',
                'email' => 'martins.berzins@example.com',
                'password' => password_hash('CitsParole2024', PASSWORD_DEFAULT),
                'address' => 'Saulkrastu iela 23, Liepāja, LV-3401'
            ],
            [
                'id'=>4,
                'name' => 'Elīna',
                'surname' => 'Kalniņa',
                'email' => 'elina.kalnina@example.com',
                'password' => password_hash('DrošaParole', PASSWORD_DEFAULT),
                'address' => 'Pils iela 8, Valmiera, LV-4201'
            ],
            [
                'id'=>5,
                'name' => 'Andris',
                'surname' => 'Zariņš',
                'email' => 'andris.zarins@example.com',
                'password' => password_hash('Super123!', PASSWORD_DEFAULT),
                'address' => 'Dzirnavu iela 4, Daugavpils, LV-5401'
            ]
];


        if($userId==""){
            return $this->response->setJSON($users);
        }
        else{
            $filtered_users = array_filter($users,function($item)  use ($userId){
                if($item["id"]==$userId){
                    return $item;
                }

            });
            $user = array_values($filtered_users)[0] ?? "";

            return $this->response->setJSON($user);

        }
        

     }

     public function show_posts($id = ""){
            $posts = [];
            
            if($id==""){
                 $query   = $this->builder->orderBy('post_date', 'DESC')->get();
            }else{
                $query   = $this->builder->where('id',esc($id))->get();
            }

            foreach ($query->getResult() as $row) {
               $posts[] = $row;
            }

            return $this->response->setJSON($posts);


     }


     public function add_post(){
        $request = service('request');
        $data = [
            "post_title" => esc($this->request->getPost("post_title")),
            "post_content" => $this->request->getPost("post_content")
        ];


        $result = $this->builder->insert($data);

        if($result){
            return $this->response->setJSON(["success"=>true]);
        }else{
            return $this->response->setJSON(["success"=>false]);
        }


        //return $this->response->setJSON($data);
     }

     public function update_post($id){

        $request = service('request');
        $data = [
            "post_title" => esc($this->request->getPost("post_title")),
            "post_content" => $this->request->getPost("post_content")
        ];


        $result = $this->builder->update($data,['id' => $id]);

        if($result){
            return $this->response->setJSON(["success"=>true]);
        }else{
            return $this->response->setJSON(["success"=>false]);
        }

     }


     public function delete_post($id){
        $request = service('request');
        if($request->is("delete")){
                $result = $this->builder->delete(['id' => $id]);
        }
        
        
        if($result){
            return $this->response->setJSON(["deleted"=>true]);
        }

     }



}
