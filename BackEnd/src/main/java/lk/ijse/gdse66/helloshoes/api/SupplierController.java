package lk.ijse.gdse66.helloshoes.api;

import lk.ijse.gdse66.helloshoes.dto.SupplierDTO;
import lk.ijse.gdse66.helloshoes.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/supplier")
@CrossOrigin
public class SupplierController {
    public SupplierController() {
        System.out.println("SupplierController");
    }

    @Autowired
    SupplierService supService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getAll")
    public List<SupplierDTO> getAllSuppliers() {
        return supService.getAllSuppliers();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id:S00-0*[1-9]\\d{0,2}}")
    public SupplierDTO getSupplier(@PathVariable("id") String id) {
        return supService.searchSupplier(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getGenId")
    public String getSupplierGenId() {
        return supService.getSupplierGenId();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> saveSupplier(@RequestBody SupplierDTO dto) {
        System.out.println("Received supplier data: " + dto.toString());
        supService.saveSupplier(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateSupplier(@RequestBody SupplierDTO dto) {
        System.out.println("Received supplier data: " + dto.toString());
        supService.updateSupplier(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "supId")
    public ResponseEntity<Void> deleteSupplier(@RequestParam("supId") String supId) {
        supService.deleteSupplier(supId);
        return ResponseEntity.noContent().build();
    }

}
