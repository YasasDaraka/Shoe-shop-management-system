package lk.ijse.gdse66.helloshoes.api;

import lk.ijse.gdse66.helloshoes.dto.SalesDTO;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/v1/sales")
@CrossOrigin
public class SalesController {
    public SalesController() {
        System.out.println("SalesController");
    }

    @Autowired
    SaleService saleService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/search/{id}")
    public SalesDTO getSales(@PathVariable("id") String id) {
        return saleService.searchSales(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping(path = "/getGenId")
    public String getCustomerGenId() {
        return saleService.getOrderGenId();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Void> saveSales(@RequestBody SalesDTO dto) {
        System.out.println("Received Sales data: " + dto.toString());
        saleService.saveSales(dto);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateSales(@RequestBody SalesDTO dto) {
        System.out.println("Received Sales data: " + dto.toString());
        saleService.updateSales(dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(params = "orderId")
    public ResponseEntity<Void> deleteSales(@RequestParam("orderId") String cusId) {
        saleService.deleteSales(cusId);
        return ResponseEntity.noContent().build();
    }
}
