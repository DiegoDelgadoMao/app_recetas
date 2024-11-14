package com.corhuila.basetareas.models.entity;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "recetas_ingredientes")
public class RecetaIngrediente implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRecetaIngrediente;

    @ManyToOne
    @JoinColumn(name = "id_receta", nullable = false)
    private Receta receta;

    @ManyToOne
    @JoinColumn(name = "id_ingrediente", nullable = false)
    private Ingrediente ingrediente;

    @Column(name = "cantidad", length = 100, nullable = false)
    private String cantidad;

    // Getters y Setters
    public Integer getIdRecetaIngrediente() {
        return idRecetaIngrediente;
    }

    public void setIdRecetaIngrediente(Integer idRecetaIngrediente) {
        this.idRecetaIngrediente = idRecetaIngrediente;
    }

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta receta) {
        this.receta = receta;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }

    public String getCantidad() {
        return cantidad;
    }

    public void setCantidad(String cantidad) {
        this.cantidad = cantidad;
    }

    private static final long serialVersionUID = 1L;
}
